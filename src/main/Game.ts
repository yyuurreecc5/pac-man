import entities from 'src/game-data/entities/entities.json';
import levelData from 'src/game-data/game-data.json';
import images from 'src/game-data/images/images.json';
import sprites from 'src/game-data/sprites/sprites.json';
import states from 'src/game-data/states/states.json';
import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME, TEntities } from 'src/main/Entity';
import { TGameObject, TGameObjects } from 'src/main/GameObject';
import { BUTTON_KEY, ControllerMain, ControllerMap } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';
import { TLevelData } from 'src/main/LevelData';
import { MOVE_DIRECTION } from 'src/main/Move';
import { TSprites } from 'src/main/Sprite';
import { TStates } from 'src/main/States';
import { getKeys } from 'src/utils/object';

const SCALE = 0.75;

export class Game {
  private readonly images: Record<string, HTMLImageElement>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private readonly states: TStates;
  private readonly entities: TEntities;
  private readonly sprites: TSprites;
  private tics: number;
  private objects: TGameObjects;
  private levelData: TLevelData;
  private readonly imagesNew: any;
  private pressedKey: BUTTON_KEY;
  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = levelData.gridSize.width * levelData.fieldSize.width * SCALE;
    this.canvas.height = levelData.gridSize.height * levelData.fieldSize.height * SCALE;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(SCALE, SCALE);
    this.states = states;
    this.entities = entities;
    this.imagesNew = images;
    this.sprites = sprites;
    this.levelData = levelData;
    this.pressedKey = BUTTON_KEY.ArrowLeft;
    this.images = {};
    this.objects = [];
  }

  start() {
    this.init().then(() => {
      this.draw();
      this.step();
    });
  }

  init() {
    this.initObjects();

    document.addEventListener('keydown', (event) => {
      this.inputHandler(event);
    });

    const imageKeys = Object.keys(this.imagesNew);
    const promises: Promise<Record<string, HTMLImageElement>>[] = imageKeys.map((imageKey) => {
      const imageSrc = require(`src/game-data/images/${this.imagesNew[imageKey]}`);
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          const result: Record<string, HTMLImageElement> = {};
          result[imageKey] = image;
          resolve(result);
        };
        image.src = imageSrc;
      });
    });

    return Promise.all(promises).then((values) => {
      values.forEach((value) => {
        this.images[Object.keys(value)[0]] = value[Object.keys(value)[0]];
      });
    });
  }

  initObjects() {
    const layers = this.levelData.layers;
    let entries: TGameObjects = [];

    getKeys(layers).forEach((layer) => {
      entries = entries.concat(
        layers[layer].entries.map((entry) => {
          const entity = this.entities[entry.name];
          const object: TGameObject = {
            layer: layer,
            name: entry.name,
            x: entry.coordinates.x,
            y: entry.coordinates.y,
            flipped: entry.flipped,
            direction: entry.direction,
            currentState: this.states[entity.initState],
            controller: ControllerMap[entry.name] || null,
            size: entity.size,
            dx: 0,
            dy: 0,
            tics: 0,
          };
          this.setMove(object);
          return object;
        })
      );
    });

    this.objects = entries;
  }

  inputHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.update();
      this.draw();
      return;
    }
    this.pressedKey = event.key as BUTTON_KEY;
  }

  proccessCollisions(movableObjects: TGameObjects) {
    movableObjects.forEach((movableObject) => {
      const diff = MOVE_DIRECTION[movableObject.direction].diff;
      let speed = Math.abs(movableObject[diff]);

      let collisionObjectIndex: number = -1;
      do {
        collisionObjectIndex = this.objects.findIndex((object) => {
          return !!this.checkCollision(movableObject, object);
        });
        if (collisionObjectIndex === -1) {
          this.moveObject(movableObject);
          this.processInput(movableObject);
        } else if (this.objects[collisionObjectIndex].layer !== LAYER.WALL) {
          if (this.objects[collisionObjectIndex].layer === LAYER.EAT) {
            this.objects.splice(collisionObjectIndex, 1);
          }
          this.moveObject(movableObject);
          this.processInput(movableObject);
        }
      } while (collisionObjectIndex === -1 && Boolean(speed) && Boolean(--speed));
    });
  }

  changeDirection(): void {
    const pacman = this.objects.find((object) => object.name === ENTITY_NAME.PACMAN);
    if (getKeys(ControllerMain).includes(this.pressedKey)) {
      pacman.direction = ControllerMain[this.pressedKey];
    }
  }

  processInputs(movableObjects: TGameObjects): void {
    movableObjects.forEach((movableObject) => {
      this.processInput(movableObject);
    });
  }

  processInput(movableObject: TGameObject): void {
    const direction: DIRECTION | null = movableObject?.controller ? movableObject.controller[this.pressedKey] : null;
    if (direction) {
      const collisionObject = this.objects.find((object) => {
        return this.isBlocked(movableObject, object, direction);
      });
      if (!collisionObject || collisionObject.layer !== LAYER.WALL) {
        this.changeDirection();
      }
    }
  }

  updateTics() {
    this.objects.forEach((object) => {
      if (Number(object.currentState.tics) === 0) return;
      if (object.tics >= object.currentState.tics) {
        object.tics = 0;
        object.currentState = this.states[object.currentState.nextState];
      }
      object.tics++;
    });
  }

  update() {
    const movableObjects = this.getMovableObjects();
    this.processInputs(movableObjects);
    this.proccessCollisions(movableObjects);
    this.updateTics();
  }

  getMovableObjects(): TGameObjects {
    const movableObjects: TGameObjects = [];
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].dx !== 0 || this.objects[i].dy !== 0) {
        movableObjects.push(this.objects[i]);
      }
    }
    return movableObjects;
  }

  checkCollision(movableObject: TGameObject, object: TGameObject): TGameObject | null {
    const direction = Object.values(ControllerMain).find((direction) => movableObject.direction === direction);
    if (direction && this.isBlocked(movableObject, object, direction)) {
      return object;
    }
    return null;
  }

  isBlocked(movableObject: TGameObject, object: TGameObject, direction: DIRECTION) {
    if (!this.needCheck(direction, movableObject, object)) return false;
    const md = MOVE_DIRECTION[direction];
    return movableObject[md.axis] === object[md.axis] - levelData.fieldSize[md.side] * md.sign;
  }

  needCheck(direction: DIRECTION, movableObject: TGameObject, object: TGameObject) {
    const md = MOVE_DIRECTION[direction];
    const isStartOfFieldByAxis =
      movableObject[md.axis] % this.levelData.fieldSize[md.side] <= Math.abs(movableObject[md.diff]);
    const isInFrontOf = movableObject[md.axis] * md.sign < object[md.axis] * md.sign;
    const isNormalIntersects =
      Math.abs(movableObject[md.normalAxis] - object[md.normalAxis]) < this.levelData.fieldSize[md.normalSide];
    return isStartOfFieldByAxis && isInFrontOf && isNormalIntersects;
  }

  setMove(object: TGameObject) {
    const entity = this.entities[object.name];
    const moveObject = MOVE_DIRECTION[object.direction];
    object[moveObject.normalDiff] = 0;
    object[moveObject.diff] = entity.speed * moveObject.sign;
  }

  moveObject(object: TGameObject) {
    this.setMove(object);
    const maxXPosition = this.levelData.fieldSize.width * this.levelData.gridSize.width;
    const minXPosition = -this.levelData.fieldSize.width * 2;

    if (object.x < minXPosition) {
      object.x = maxXPosition;
    } else if (object.x > maxXPosition) {
      object.x = minXPosition;
    }
    object.x += 1 * Math.sign(object.dx);
    object.y += 1 * Math.sign(object.dy);
  }

  draw() {
    const levelWidth = this.levelData.gridSize.width * this.levelData.fieldSize.width;
    const levelHeight = this.levelData.gridSize.height * this.levelData.fieldSize.height;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, levelWidth, levelHeight);

    this.objects.forEach((object) => {
      const halfWidth = object.size.width / 2;
      const halfHeight = object.size.height / 2;
      const sprite = this.sprites[object.currentState.sprite];
      const spr = sprite[object.direction];

      this.ctx.save();
      const offsetX = Math.floor((this.levelData.fieldSize.width - object.size.width) / 2);
      const offsetY = Math.floor((this.levelData.fieldSize.height - object.size.height) / 2);
      this.ctx.translate(object.x + offsetX, object.y + offsetY); // change origin

      if (spr.rotate > 0) {
        this.ctx.translate(halfWidth, halfHeight); // change origin
        this.ctx.rotate((spr.rotate * Math.PI) / 180);
        this.ctx.translate(-halfWidth, -halfHeight); // change origin
      }

      if (object.flipped) {
        this.ctx.translate(object.size.width, 0);
        this.ctx.scale(-1, 1);
      }

      const image = this.images[spr.image];
      this.ctx.drawImage(image, 0, 0, object.size.width, object.size.height);
      this.ctx.restore();
    });
    //this.drawGrid()
  }

  drawGrid() {
    this.ctx.strokeStyle = '#FFFFFF';
    for (let w = 0; w < levelData.gridSize.width; w++) {
      for (let h = 0; h < levelData.gridSize.height; h++) {
        this.ctx.strokeRect(
          w * this.levelData.fieldSize.width,
          h * this.levelData.fieldSize.height,
          this.levelData.fieldSize.width,
          this.levelData.fieldSize.height
        );
      }
    }
  }

  step() {
    requestAnimationFrame(this.step.bind(this));
    this.update();
    this.draw();
  }
}

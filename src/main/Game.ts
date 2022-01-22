import entities from 'src/game-data/entities/entities.json';
import levelData from 'src/game-data/game-data.json';
import states from 'src/game-data/states/states.json';
import { Audio } from 'src/main/audio/audio';
import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME, TEntities } from 'src/main/Entity';
import { gameLoop } from 'src/main/GameLoop';
import { GameObject } from 'src/main/GameObject';
import { BUTTON_KEY, ControllerMain } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';
import { TLevelData } from 'src/main/LevelData';
import { MOVE_DIRECTION } from 'src/main/Move';
import { GameRenderer } from 'src/main/render/GameRenderer';
import { TStates } from 'src/main/States';
import { getKeys } from 'src/utils/object';
import './audio/audio';

export class Game {
  private readonly states: TStates;
  private readonly entities: TEntities;
  private tics: number;
  private objects: GameObject[];
  private levelData: TLevelData;
  private pressedKey: BUTTON_KEY;
  private renderer: GameRenderer;
  constructor() {
    this.states = states;
    this.entities = entities;
    this.levelData = levelData;
    this.pressedKey = BUTTON_KEY.ArrowLeft;
    this.objects = [];
    this.renderer = new GameRenderer();
  }

  async start() {
    this.init();
    await this.renderer.init();
    this.step();
  }

  init() {
    this.initObjects();

    document.addEventListener('keydown', (event) => {
      this.inputHandler(event);
    });

    Audio.getFile('/assets/audio/start.mp3').then((buffer) => {
      console.log(buffer);
      const track = Audio.playTrack(buffer);
      console.log(track);
    });
  }

  initObjects() {
    const layers = this.levelData.layers;
    let entries: GameObject[] = [];

    getKeys(layers).forEach((layer) => {
      entries = entries.concat(
        layers[layer].entries.map((entry) => {
          const object = new GameObject(layer, entry);
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
    this.pressedKey = event.key.toLowerCase() as BUTTON_KEY;
  }

  proccessCollisions(movableObjects: GameObject[]) {
    movableObjects.forEach((movableObject) => {
      const diff = MOVE_DIRECTION[movableObject.direction].diff;
      let speed = Math.abs(movableObject[diff]);

      let collisionObjectIndex: number = -1;
      do {
        collisionObjectIndex = this.objects.findIndex((object) => {
          return !!this.checkCollision(movableObject, object);
        });
        if (collisionObjectIndex === -1) {
          movableObject.move();
          this.processInput(movableObject);
        } else if (this.objects[collisionObjectIndex].layer !== LAYER.WALL) {
          if (this.objects[collisionObjectIndex].layer === LAYER.EAT) {
            this.objects.splice(collisionObjectIndex, 1);
          }
          movableObject.move();
          this.processInput(movableObject);
        }
      } while (collisionObjectIndex === -1 && Boolean(speed) && Boolean(--speed));
    });
  }

  processInputs(movableObjects: GameObject[]): void {
    movableObjects.forEach((movableObject) => {
      this.processInput(movableObject);
    });
  }

  processInput(movableObject: GameObject): void {
    movableObject.processInput((direction: DIRECTION) => {
      const collisionObject = this.objects.find((object) => {
        return this.isBlocked(movableObject, object, direction);
      });
      if (!collisionObject || collisionObject.layer !== LAYER.WALL) {
        movableObject.direction = direction;
      }
    });
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

  getMovableObjects(): GameObject[] {
    const movableObjects: GameObject[] = [];
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].dx !== 0 || this.objects[i].dy !== 0) {
        movableObjects.push(this.objects[i]);
      }
    }
    return movableObjects;
  }

  checkCollision(movableObject: GameObject, object: GameObject): GameObject | null {
    const direction = Object.values(ControllerMain).find((direction) => movableObject.direction === direction);
    if (direction && this.isBlocked(movableObject, object, direction)) {
      return object;
    }
    return null;
  }

  isBlocked(movableObject: GameObject, object: GameObject, direction: DIRECTION) {
    if (!this.needCheck(direction, movableObject, object)) return false;
    const md = MOVE_DIRECTION[direction];
    return movableObject[md.axis] === object[md.axis] - levelData.fieldSize[md.side] * md.sign;
  }

  needCheck(direction: DIRECTION, movableObject: GameObject, object: GameObject) {
    const md = MOVE_DIRECTION[direction];
    const isStartOfFieldByAxis =
      movableObject[md.axis] % this.levelData.fieldSize[md.side] <= Math.abs(movableObject[md.diff]);
    const isInFrontOf = movableObject[md.axis] * md.sign < object[md.axis] * md.sign;
    const isNormalIntersects =
      Math.abs(movableObject[md.normalAxis] - object[md.normalAxis]) < this.levelData.fieldSize[md.normalSide];
    return isStartOfFieldByAxis && isInFrontOf && isNormalIntersects;
  }

  draw() {
    this.renderer.draw(this.objects);
  }

  step() {
    gameLoop(this.draw.bind(this), this.update.bind(this));
  }
}

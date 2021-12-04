import states from '../game-data/states/states.json';
import entities from '../game-data/entities/entities.json';
import images from '../game-data/images/images.json';
import sprites from '../game-data/sprites/sprites.json';
import levelData from '../game-data/game-data.json';

const SCALE = 0.75;
let flag = 0;

enum LAYERS {
  WALL = 'walls',
  EAT = 'eats',
}

enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down',
}

enum BUTTON_KEY {
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  No = 'No',
}

type TMove = {
  sign: -1 | 1;
  axis: 'x' | 'y';
  normalAxis: 'x' | 'y';
  diff: 'dx' | 'dy';
  normalDiff: 'dx' | 'dy';
  side: 'width' | 'height';
  normalSide: 'width' | 'height';
};

type TDirectionMove = Record<DIRECTION, TMove>;

const MOVE_DIRECTION: TDirectionMove = {
  [DIRECTION.RIGHT]: {
    sign: 1,
    axis: 'x',
    normalAxis: 'y',
    diff: 'dx',
    normalDiff: 'dy',
    side: 'width',
    normalSide: 'height',
  },
  [DIRECTION.LEFT]: {
    sign: -1,
    axis: 'x',
    normalAxis: 'y',
    diff: 'dx',
    normalDiff: 'dy',
    side: 'width',
    normalSide: 'height',
  },
  [DIRECTION.UP]: {
    sign: -1,
    axis: 'y',
    normalAxis: 'x',
    diff: 'dy',
    normalDiff: 'dx',
    side: 'height',
    normalSide: 'width',
  },
  [DIRECTION.DOWN]: {
    sign: 1,
    axis: 'y',
    normalAxis: 'x',
    diff: 'dy',
    normalDiff: 'dx',
    side: 'height',
    normalSide: 'width',
  },
};

type TController = Partial<Record<BUTTON_KEY, DIRECTION>>;
const ControllerMain: TController = {
  [BUTTON_KEY.ArrowRight]: DIRECTION.RIGHT,
  [BUTTON_KEY.ArrowDown]: DIRECTION.DOWN,
  [BUTTON_KEY.ArrowLeft]: DIRECTION.LEFT,
  [BUTTON_KEY.ArrowUp]: DIRECTION.UP,
};

enum ENTITIES {
  PACMAN = 'pacman',
}

const ControllerMap: Record<ENTITIES, TController> = {
  [ENTITIES.PACMAN]: ControllerMain,
};

export class Game {
  private readonly images: Object;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private readonly states: object;
  private readonly entities: object;
  private readonly sprites: object;
  private tics: number;
  private objects: any;
  private levelData: any;
  private readonly imagesNew: any;
  private pressedKey: BUTTON_KEY;
  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width =
      levelData.gridSize.width * levelData.fieldSize.width * SCALE;
    this.canvas.height =
      levelData.gridSize.height * levelData.fieldSize.height * SCALE;
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
    const promises = imageKeys.map((imageKey) => {
      const imageSrc = require(`../game-data/images/${this.imagesNew[imageKey]}`);
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          const result = {};
          result[imageKey] = image;
          resolve(result);
        };
        image.src = imageSrc;
      });
    });

    return Promise.all(promises).then((values: Array<HTMLImageElement>) => {
      values.forEach((value) => {
        this.images[Object.keys(value)[0]] = value[Object.keys(value)[0]];
      });
    });
  }

  initObjects() {
    const layers = this.levelData.layers;
    let entries = [];
    for (const key in layers) {
      entries = entries.concat(
        layers[key].entries.map((entry) => {
          const entity = this.entities[entry.name];
          const object = {
            name: entry.name,
            x: entry.coordinates.x,
            y: entry.coordinates.y,
            dx: 0,
            dy: 0,
            tics: 0,
            direction: entry.direction,
            currentState: this.states[entity.initState],
            size: entity.size,
            angle: entry.angle,
            layer: key,
            controller: ControllerMap[entry.name] || null,
          };
          this.setMove(object);
          return object;
        })
      );
    }
    this.objects = entries;
  }

  inputHandler(event) {
    if (event.key === 'Enter') {
      this.update();
      this.draw();
      return;
    }
    this.pressedKey = event.key;
  }

  updateMoves(movableObjects) {
    movableObjects.forEach((movableObject) => {
      const diff = MOVE_DIRECTION[movableObject.direction].diff;
      let speed = Math.abs(movableObject[diff]);

      let isCol = false;
      do {
        isCol = this.objects.some((object) => {
          return this.checkCollision(movableObject, object, LAYERS.WALL);
        });

        if (!isCol) {
          this.moveObject(movableObject);
          this.processInput(movableObject);
        }
      } while (!isCol && Boolean(speed) && Boolean(--speed));
    });
  }

  changeDirection() {
    const pacman = this.objects.find((object) => object.name === 'pacman');
    if (
      (Object.keys(ControllerMain) as Array<keyof typeof BUTTON_KEY>).includes(
        this.pressedKey
      )
    ) {
      pacman.direction = ControllerMain[this.pressedKey];
    }
  }

  processInputs(movableObjects) {
    movableObjects.forEach((movableObject) => {
      this.processInput(movableObject);
    });
  }

  processInput(movableObject) {
    const direction: DIRECTION | null = movableObject?.controller
      ? movableObject.controller[this.pressedKey]
      : null;
    if (direction) {
      const isBlocked = this.objects.some((object) => {
        return this.isBlocked(movableObject, object, LAYERS.WALL, direction);
      });
      if (!isBlocked) {
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
    this.updateMoves(movableObjects);
    this.updateTics();
  }

  getMovableObjects() {
    const movableObjects = [];
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].dx !== 0 || this.objects[i].dy !== 0) {
        movableObjects.push(this.objects[i]);
      }
    }
    return movableObjects;
  }

  checkCollision(movableObject, object, layer) {
    const direction = Object.values(ControllerMain).find(
      (direction) => movableObject.direction === direction
    );
    if (direction) {
      const isBlocked = this.isBlocked(movableObject, object, layer, direction);
      return isBlocked;
    }
  }

  isBlocked(movableObject, object, layer, direction: DIRECTION) {
    if (object.layer !== layer) return false;
    if (!this.needCheck(direction, movableObject, object)) return false;
    const md = MOVE_DIRECTION[direction];
    return (
      movableObject[md.axis] ===
      object[md.axis] - levelData.fieldSize[md.side] * md.sign
    );
  }

  needCheck(direction: DIRECTION, movableObject, object) {
    const md = MOVE_DIRECTION[direction];
    const isStartOfFieldByAxis =
      movableObject[md.axis] % this.levelData.fieldSize[md.side] <=
      Math.abs(movableObject[md.diff]);
    const isInFrontOf =
      movableObject[md.axis] * md.sign < object[md.axis] * md.sign;
    const isNormalIntersects =
      Math.abs(movableObject[md.normalAxis] - object[md.normalAxis]) <
      this.levelData.fieldSize[md.normalSide];
    return isStartOfFieldByAxis && isInFrontOf && isNormalIntersects;
  }

  setMove(object) {
    const entity = this.entities[object.name];
    const moveObject = MOVE_DIRECTION[object.direction];
    object[moveObject.normalDiff] = 0;
    object[moveObject.diff] = entity.speed * moveObject.sign;
  }

  moveObject(object) {
    this.setMove(object);
    object.x += 1 * Math.sign(object.dx);
    object.y += 1 * Math.sign(object.dy);
  }

  draw() {
    const levelWidth =
      this.levelData.gridSize.width * this.levelData.fieldSize.width;
    const levelHeight =
      this.levelData.gridSize.height * this.levelData.fieldSize.height;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, levelWidth, levelHeight);

    this.objects.forEach((object) => {
      const halfWidth = object.size.width / 2;
      const halfHeight = object.size.height / 2;
      const sprite = this.sprites[object.currentState.sprite];
      const spr = sprite[object.direction];

      this.ctx.save();
      const offsetX = Math.floor(
        (this.levelData.fieldSize.width - object.size.width) / 2
      );
      const offsetY = Math.floor(
        (this.levelData.fieldSize.height - object.size.height) / 2
      );
      this.ctx.translate(object.x + offsetX, object.y + offsetY); // change origin

      if (spr.rotate > 0) {
        this.ctx.translate(halfWidth, halfHeight); // change origin
        this.ctx.rotate((spr.rotate * Math.PI) / 180);
        this.ctx.translate(-halfWidth, -halfHeight); // change origin
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

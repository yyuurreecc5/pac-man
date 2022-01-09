import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME } from 'src/main/Entity';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { getEventEmitter } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';
import { TLevelDataEntry } from 'src/main/LevelData';
import { MOVE_DIRECTION } from 'src/main/Move';
import { TState } from 'src/main/States';
import entities from 'src/game-data/entities/entities.json';
import states from 'src/game-data/states/states.json';
import levelData from 'src/game-data/game-data.json';

export class GameObject {
  public layer: LAYER;
  public name: ENTITY_NAME;
  public x: number;
  public y: number;
  public flipped: boolean;
  public direction: DIRECTION;
  public currentState: TState;
  public eventEmitter: EventsEmitter | null;
  public size: {
    width: number;
    height: number;
  };
  public dx: number;
  public dy: number;
  public tics: number;
  public speed: number;
  private tryDirection: DIRECTION;

  constructor(layer: LAYER, entry: TLevelDataEntry) {
    const entity = entities[entry.name];
    this.layer = layer;
    this.name = entry.name;
    this.x = entry.coordinates.x;
    this.y = entry.coordinates.y;
    this.flipped = entry.flipped;
    this.direction = entry.direction;
    this.tryDirection = this.direction;
    this.speed = entities[entry.name].speed;
    this.currentState = states[entity.initState];
    this.eventEmitter = getEventEmitter(entry.name);
    this.dx = 0;
    this.dy = 0;
    this.tics = 0;
    this.size = entity.size;
    this.setMove();
  }

  move() {
    this.setMove();
    const maxXPosition = levelData.fieldSize.width * levelData.gridSize.width;
    const minXPosition = -levelData.fieldSize.width * 2;

    if (this.x < minXPosition) {
      this.x = maxXPosition;
    } else if (this.x > maxXPosition) {
      this.x = minXPosition;
    }
    this.x += 1 * Math.sign(this.dx);
    this.y += 1 * Math.sign(this.dy);
  }

  private setMove() {
    const moveObject = MOVE_DIRECTION[this.direction];
    this[moveObject.normalDiff] = 0;
    this[moveObject.diff] = this.speed * moveObject.sign;
  }

  processInput(callback: (direction: DIRECTION) => void) {
    this.eventEmitter.handleEvents((direction) => {
      this.tryDirection = direction;
    });
    callback(this.tryDirection);
  }
}

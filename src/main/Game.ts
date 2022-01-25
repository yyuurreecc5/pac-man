import entities from 'src/game-data/entities/entities.json';
import { Audio } from 'src/main/audio/audio';
import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME, TEntities } from 'src/main/Entity';
import { gameLoop } from 'src/main/GameLoop';
import { GameObject } from 'src/main/GameObject';
import { BUTTON_KEY, ControllerMain } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';
import { levelData, TLevelData } from 'src/main/LevelData';
import { MOVE_DIRECTION } from 'src/main/Move';
import { GameRenderer } from 'src/main/render/GameRenderer';
import { startScreenResponder } from 'src/main/render/StartScreenRenderer';
import { states, TStates } from 'src/main/States';
import { getKeys } from 'src/utils/object';
import './audio/audio';

export enum Gamestate {
  MENU = 'menu',
  LEVEL = 'level',
}

export let gamestate: Gamestate = Gamestate.MENU;

export function setGameState(gs: Gamestate) {
  gamestate = gs;
}

const renderer = new GameRenderer();

export async function initGame() {
  initGameObjects();
  await renderer.init();
}

export function startGame() {
  initGame();
  setGameState(Gamestate.MENU);
  gameLoop(draw, update);
}

export async function startLevel() {
  setGameState(Gamestate.LEVEL);
  Audio.getFile('/assets/audio/start.mp3').then((buffer) => {
    const track = Audio.playTrack(buffer);
  });
}

export async function draw() {
  renderer.draw(gameObjects);
}

export let gameObjects: GameObject[] = [];
export function initGameObjects(): void {
  const layers = levelData.layers;
  let entries: GameObject[] = [];

  getKeys(layers).forEach((layer) => {
    entries = entries.concat(
      layers[layer].entries.map((entry) => {
        return new GameObject(layer, entry);
      })
    );
  });

  gameObjects = entries;
}

function update(): void {
  if (gamestate === Gamestate.LEVEL) {
    const movableObjects = getMovableObjects();
    processInputs(movableObjects);
    proccessCollisions(movableObjects);
    updateTics();
  }
}

function getMovableObjects(): GameObject[] {
  const movableObjects: GameObject[] = [];
  for (let i = 0; i < gameObjects.length; i++) {
    if (gameObjects[i].dx !== 0 || gameObjects[i].dy !== 0) {
      movableObjects.push(gameObjects[i]);
    }
  }
  return movableObjects;
}

document.addEventListener('keydown', (event) => {
  if (gamestate === Gamestate.MENU) {
    startScreenResponder(event);
  }
});

function processInputs(movableObjects: GameObject[]): void {
  if (gamestate === Gamestate.LEVEL) {
    gameLevelResponder(movableObjects);
  }
}

function gameLevelResponder(movableObjects: GameObject[]) {
  movableObjects.forEach((movableObject) => {
    processInput(movableObject);
  });
}

function proccessCollisions(movableObjects: GameObject[]): void {
  movableObjects.forEach((movableObject) => {
    const diff = MOVE_DIRECTION[movableObject.direction].diff;
    let speed = Math.abs(movableObject[diff]);

    let collisionObjectIndex: number = -1;
    do {
      collisionObjectIndex = gameObjects.findIndex((object) => {
        return !!checkCollision(movableObject, object);
      });
      if (collisionObjectIndex === -1) {
        movableObject.move();
        processInput(movableObject);
      } else if (gameObjects[collisionObjectIndex].layer !== LAYER.WALL) {
        if (gameObjects[collisionObjectIndex].layer === LAYER.EAT) {
          gameObjects.splice(collisionObjectIndex, 1);
        }
        movableObject.move();
        processInput(movableObject);
      }
    } while (collisionObjectIndex === -1 && Boolean(speed) && Boolean(--speed));
  });
}

function processInput(movableObject: GameObject): void {
  movableObject.processInput((direction: DIRECTION) => {
    const collisionObject = gameObjects.find((object) => {
      return isBlocked(movableObject, object, direction);
    });
    if (!collisionObject || collisionObject.layer !== LAYER.WALL) {
      movableObject.direction = direction;
    }
  });
}

function updateTics(): void {
  gameObjects.forEach((object) => {
    if (Number(object.currentState.tics) === 0) return;
    if (object.tics >= object.currentState.tics) {
      object.tics = 0;
      object.currentState = states[object.currentState.nextState];
    }
    object.tics++;
  });
}

function checkCollision(movableObject: GameObject, object: GameObject): GameObject | null {
  const direction = Object.values(ControllerMain).find((direction) => movableObject.direction === direction);
  if (direction && isBlocked(movableObject, object, direction)) {
    return object;
  }
  return null;
}

function isBlocked(movableObject: GameObject, object: GameObject, direction: DIRECTION) {
  if (!needCheck(direction, movableObject, object)) return false;
  const md = MOVE_DIRECTION[direction];
  return movableObject[md.axis] === object[md.axis] - levelData.fieldSize[md.side] * md.sign;
}

function needCheck(direction: DIRECTION, movableObject: GameObject, object: GameObject) {
  const md = MOVE_DIRECTION[direction];
  const isStartOfFieldByAxis =
    movableObject[md.axis] % levelData.fieldSize[md.side] <= Math.abs(movableObject[md.diff]);
  const isInFrontOf = movableObject[md.axis] * md.sign < object[md.axis] * md.sign;
  const isNormalIntersects =
    Math.abs(movableObject[md.normalAxis] - object[md.normalAxis]) < levelData.fieldSize[md.normalSide];
  return isStartOfFieldByAxis && isInFrontOf && isNormalIntersects;
}

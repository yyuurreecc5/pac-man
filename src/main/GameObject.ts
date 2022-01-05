import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME } from 'src/main/Entity';
import { TController } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';
import { TState } from 'src/main/States';

export type TGameObject = {
  name: ENTITY_NAME;
  x: number;
  y: number;
  dx: number;
  dy: number;
  tics: number;
  direction: DIRECTION;
  currentState: TState;
  size: {
    width: number;
    height: number;
  };
  layer: LAYER;
  controller: TController | null;
  flipped: boolean;
};

export type TGameObjects = TGameObject[];

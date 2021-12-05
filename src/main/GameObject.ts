import { DIRECTION } from 'src/main/Direction';
import { TController } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';
import { TState } from 'src/main/States';

export type TGameObject = {
  name: string;
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

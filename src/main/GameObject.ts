import { DIRECTION } from 'src/main/Direction';
import { TController } from 'src/main/Input';
import { LAYER } from 'src/main/Layer';

export type TGameObject = {
  name: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  tics: number;
  direction: DIRECTION;
  currentState: unknown;
  size: number;
  layer: LAYER;
  controller: TController | null;
  flipped: boolean;
};

import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME } from 'src/main/Entity';

export enum BUTTON_KEY {
  ArrowRight = 'arrowright',
  ArrowLeft = 'arrowleft',
  ArrowUp = 'arrowup',
  ArrowDown = 'arrowdown',
  A = 'a',
  D = 'd',
  W = 'w',
  S = 's',
  No = 'No',
}

export type TController = Partial<Record<BUTTON_KEY, DIRECTION>>;

export const ControllerMain: TController = {
  [BUTTON_KEY.ArrowRight]: DIRECTION.RIGHT,
  [BUTTON_KEY.ArrowDown]: DIRECTION.DOWN,
  [BUTTON_KEY.ArrowLeft]: DIRECTION.LEFT,
  [BUTTON_KEY.ArrowUp]: DIRECTION.UP,
};

export const ControllerPinky: TController = {
  [BUTTON_KEY.D]: DIRECTION.RIGHT,
  [BUTTON_KEY.S]: DIRECTION.DOWN,
  [BUTTON_KEY.A]: DIRECTION.LEFT,
  [BUTTON_KEY.W]: DIRECTION.UP,
};

export const ControllerMap: Record<ENTITY_NAME, TController> = {
  [ENTITY_NAME.PACMAN]: ControllerMain,
  [ENTITY_NAME.PINKY]: ControllerPinky,
};

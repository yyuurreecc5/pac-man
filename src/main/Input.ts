import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME } from 'src/main/Entity';

export enum BUTTON_KEY {
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  No = 'No',
}

export type TController = Partial<Record<BUTTON_KEY, DIRECTION>>;

export const ControllerMain: TController = {
  [BUTTON_KEY.ArrowRight]: DIRECTION.RIGHT,
  [BUTTON_KEY.ArrowDown]: DIRECTION.DOWN,
  [BUTTON_KEY.ArrowLeft]: DIRECTION.LEFT,
  [BUTTON_KEY.ArrowUp]: DIRECTION.UP,
};

export const ControllerMap: Record<ENTITY_NAME, TController> = {
  [ENTITY_NAME.PACMAN]: ControllerMain,
};

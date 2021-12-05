import { DIRECTION } from 'src/main/Direction';
import { ENTITIES } from 'src/main/Entities';

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

export const ControllerMap: Record<ENTITIES, TController> = {
  [ENTITIES.PACMAN]: ControllerMain,
};

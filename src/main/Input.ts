import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME } from 'src/main/Entity';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { PacmanEventEmitter } from 'src/main/events/PlayerEventsEmitter';
import { RandomEventsEmitter } from 'src/main/events/RandomEventsEmitter';

export enum BUTTON_KEY {
  ArrowRight = 'arrowright',
  ArrowLeft = 'arrowleft',
  ArrowUp = 'arrowup',
  ArrowDown = 'arrowdown',
}

export type TController = Partial<Record<BUTTON_KEY, DIRECTION>>;

export const ControllerMain: TController = {
  [BUTTON_KEY.ArrowRight]: DIRECTION.RIGHT,
  [BUTTON_KEY.ArrowDown]: DIRECTION.DOWN,
  [BUTTON_KEY.ArrowLeft]: DIRECTION.LEFT,
  [BUTTON_KEY.ArrowUp]: DIRECTION.UP,
};

export const getEventEmitter = (name: ENTITY_NAME): EventsEmitter | null => {
  switch (name) {
    case ENTITY_NAME.PACMAN:
      return new PacmanEventEmitter();
    case ENTITY_NAME.PINKY:
      return new RandomEventsEmitter();
    default:
      return null;
  }
};

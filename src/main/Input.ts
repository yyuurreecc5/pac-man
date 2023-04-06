import { Direction } from 'src/main/Direction';
import { EntityName } from 'src/main/Entity';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { PacmanEventEmitter } from 'src/main/events/PlayerEventsEmitter';
import { RandomEventsEmitter } from 'src/main/events/RandomEventsEmitter';

export enum ButtonKey {
  ARROW_RIGHT = 'arrowright',
  ARROW_LEFT = 'arrowleft',
  ARROW_UP = 'arrowup',
  ARROW_DOWN = 'arrowdown',
}

export type TController = Partial<Record<ButtonKey, Direction>>;

export const ControllerMain: TController = {
  [ButtonKey.ARROW_RIGHT]: Direction.RIGHT,
  [ButtonKey.ARROW_DOWN]: Direction.DOWN,
  [ButtonKey.ARROW_LEFT]: Direction.LEFT,
  [ButtonKey.ARROW_UP]: Direction.UP,
};

export const getEventEmitter = (name: EntityName): EventsEmitter | null => {
  switch (name) {
    case EntityName.PACMAN:
      return new PacmanEventEmitter();
    case EntityName.PINKY:
      return new RandomEventsEmitter();
    default:
      return null;
  }
};

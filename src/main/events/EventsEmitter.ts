import { DIRECTION } from 'src/main/Direction';

export interface EventsEmitter {
  handleEvents(callback: (event: DIRECTION) => void): void;
}

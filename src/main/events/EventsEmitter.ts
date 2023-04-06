import { Direction } from 'src/main/Direction';

export interface EventsEmitter {
  handleEvents(callback: (event: Direction) => void): void;
}

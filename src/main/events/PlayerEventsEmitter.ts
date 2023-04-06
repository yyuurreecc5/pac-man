import { Direction } from 'src/main/Direction';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { ButtonKey, ControllerMain } from 'src/main/Input';

export class PacmanEventEmitter implements EventsEmitter {
  private events: Direction[] = [];

  constructor() {
    document.addEventListener('keydown', (event) => {
      const buttonKey = event.key.toLowerCase() as ButtonKey;
      if (ControllerMain[buttonKey]) {
        this.events.push(ControllerMain[buttonKey]);
      }
    });
  }

  handleEvents(callback: (event: Direction) => void): void {
    this.events.forEach((event) => callback(event));
    this.events = [];
  }
}

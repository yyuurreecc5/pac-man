import { DIRECTION } from 'src/main/Direction';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { BUTTON_KEY, ControllerMain } from 'src/main/Input';

export class PacmanEventEmitter implements EventsEmitter {
  private events: DIRECTION[] = [];

  constructor() {
    document.addEventListener('keydown', (event) => {
      const buttonKey = event.key.toLowerCase() as BUTTON_KEY;
      if (ControllerMain[buttonKey]) {
        this.events.push(ControllerMain[buttonKey]);
      }
    });
  }

  handleEvents(callback: (event: DIRECTION) => void): void {
    this.events.forEach((event) => callback(event));
    this.events = [];
  }
}

import { DIRECTION } from 'src/main/Direction';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { randomEnumValue } from 'src/utils/object';

export class RandomEventsEmitter implements EventsEmitter {
  private events: DIRECTION[] = [];

  constructor() {
    setInterval(() => {
      this.events.push(randomEnumValue(DIRECTION));
    }, 400);
  }

  handleEvents(callback: (event: DIRECTION) => void): void {
    this.events.forEach((event) => callback(event));
    this.events = [];
  }
}

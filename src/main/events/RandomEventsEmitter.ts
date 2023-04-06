import { Direction } from 'src/main/Direction';
import { EventsEmitter } from 'src/main/events/EventsEmitter';
import { randomEnumValue } from 'src/utils/object';

export class RandomEventsEmitter implements EventsEmitter {
  private events: Direction[] = [];

  constructor() {
    setInterval(() => {
      this.events.push(randomEnumValue(Direction));
    }, 400);
  }

  handleEvents(callback: (event: Direction) => void): void {
    this.events.forEach((event) => callback(event));
    this.events = [];
  }
}

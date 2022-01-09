import { TMilliseconds } from 'src/utils/types';

let currentTick: TMilliseconds = performance.now();
let lastTick: TMilliseconds = performance.now();
let accumulator: TMilliseconds = 0;
const tick: TMilliseconds = 1000 / 60;

export const gameLoop = (draw: () => void, update: () => void) => {
  requestAnimationFrame(() => gameLoop(draw, update));
  currentTick = performance.now();
  accumulator += currentTick - lastTick;
  if (accumulator >= tick) {
    do {
      accumulator -= tick;
      update();
    } while (accumulator >= tick);
  }
  draw();
  lastTick = currentTick;
};

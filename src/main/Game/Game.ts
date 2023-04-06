export enum State {
  MENU = 'menu',
  LEVEL = 'level',
  PAUSE = 'pause',
}

let gamestate: State = State.MENU;

export function setState(gs: State) {
  gamestate = gs;
}

export function getState(): State {
  return gamestate;
}

export function isInState(gs: State): boolean {
  return getState() === gs;
}

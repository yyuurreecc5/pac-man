export type TState = {
  sprite: string;
  tics: number;
  nextState: string;
};

export type TStates = Record<string, TState>;

import { TSprite } from 'src/main/Sprite';

export type TState = {
  sprite: keyof TSprite;
  tics: number;
  nextState: string;
};
export type TStates = Record<string, TState>;

import statesJson from 'src/game-data/states/states.json';
import { TSprite } from 'src/main/Sprite';
import { DeepReadonly } from 'src/utils/types';

export type TState = {
  sprite: keyof TSprite;
  tics: number;
  nextState: keyof TStates;
};
export type TStates = Record<string, TState>;

export const states: DeepReadonly<TStates> = statesJson;

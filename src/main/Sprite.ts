import { DIRECTION } from 'src/main/Direction';

export type TSprites = Record<string, TSprite>;

export type TSprite = Record<DIRECTION, TSpriteOfDirection>;

export type TSpriteOfDirection = {
  image: string;
  rotate: number;
};

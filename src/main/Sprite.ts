import { Direction } from 'src/main/Direction';

export type TSprites = Record<string, TSprite>;

export type TSprite = Record<Direction, TSpriteOfDirection>;

export type TSpriteOfDirection = {
  image: string;
  rotate: number;
};

import { DIRECTION } from 'src/main/Direction';
import { LAYER } from 'src/main/Layer';

export type TLevelData = {
  gridSize: {
    width: number;
    height: number;
  };
  fieldSize: {
    width: number;
    height: number;
  };
  layers: Record<
    LAYER,
    {
      entries: {
        name: string;
        coordinates: { x: number; y: number };
        flipped: boolean;
        direction: DIRECTION;
      }[];
    }
  >;
};
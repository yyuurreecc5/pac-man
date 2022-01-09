import { DIRECTION } from 'src/main/Direction';
import { ENTITY_NAME } from 'src/main/Entity';
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
  layers: Record<LAYER, { entries: TLevelDataEntries }>;
};

export type TLevelDataEntry = {
  name: ENTITY_NAME;
  coordinates: { x: number; y: number };
  flipped: boolean;
  direction: DIRECTION;
};

export type TLevelDataEntries = TLevelDataEntry[];

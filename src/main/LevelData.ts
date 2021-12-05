export type TLevelData = {
  gridSize: {
    width: number;
    height: number;
  };
  fieldSize: {
    width: number;
    height: number;
  };
  layers: {
    [layer: string]: {
      entries: {
        name: string;
        coordinates: { x: number; y: number };
        flipped: boolean;
        direction: string;
      }[];
    };
  };
};

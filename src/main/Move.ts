import { DIRECTION } from 'src/main/Direction';

export type TMove = {
  sign: -1 | 1;
  axis: 'x' | 'y';
  normalAxis: 'x' | 'y';
  diff: 'dx' | 'dy';
  normalDiff: 'dx' | 'dy';
  side: 'width' | 'height';
  normalSide: 'width' | 'height';
};

export type TDirectionMove = Record<DIRECTION, TMove>;

export const MOVE_DIRECTION: TDirectionMove = {
  [DIRECTION.RIGHT]: {
    sign: 1,
    axis: 'x',
    normalAxis: 'y',
    diff: 'dx',
    normalDiff: 'dy',
    side: 'width',
    normalSide: 'height',
  },
  [DIRECTION.LEFT]: {
    sign: -1,
    axis: 'x',
    normalAxis: 'y',
    diff: 'dx',
    normalDiff: 'dy',
    side: 'width',
    normalSide: 'height',
  },
  [DIRECTION.UP]: {
    sign: -1,
    axis: 'y',
    normalAxis: 'x',
    diff: 'dy',
    normalDiff: 'dx',
    side: 'height',
    normalSide: 'width',
  },
  [DIRECTION.DOWN]: {
    sign: 1,
    axis: 'y',
    normalAxis: 'x',
    diff: 'dy',
    normalDiff: 'dx',
    side: 'height',
    normalSide: 'width',
  },
};

export enum ENTITY_NAME {
  PACMAN = 'pacman',
}

export enum ENTITY_STATE {
  INIT = 'initState',
  DEATH = 'deathState',
}

export type TEntity = {
  name: ENTITY_NAME;
  speed: number;
  size: {
    width: number;
    height: number;
  };
  initState: ENTITY_STATE;
  deathState: ENTITY_STATE;
};

export type TEntities = Record<ENTITY_NAME, TEntity>;

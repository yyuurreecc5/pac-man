export enum EntityName {
  PACMAN = 'pacman',
  PINKY = 'ghost',
}

export enum EntityState {
  INIT = 'initState',
  DEATH = 'deathState',
}

export type TEntity = {
  name: EntityName;
  speed: number;
  size: {
    width: number;
    height: number;
  };
  initState: EntityState;
  deathState: EntityState;
};

export type TEntities = Record<EntityName, TEntity>;

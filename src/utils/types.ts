export type TMilliseconds = number;

export type ValueOf<T> = T[keyof T];

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

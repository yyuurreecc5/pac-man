import { ValueOf } from 'src/utils/types';

export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export const randomEnumKey = <T extends object>(enumeration: T): keyof T => {
  const keys = getKeys(enumeration).filter((k) => !(Math.abs(Number.parseInt(String(k))) + 1));
  return keys[Math.floor(Math.random() * keys.length)];
};

export const randomEnumValue = <T extends object>(enumeration: T): ValueOf<T> => {
  return enumeration[randomEnumKey(enumeration)];
};

import { all, map, prop } from 'ramda';
import { Control } from '../type';

type ArrayControl = <T>(ctrl: Control<T>) => Control<T, T[]>;

export const actrl: ArrayControl = ctrl => value => {
  const isArray = Array.isArray(value);
  const holders = map(ctrl, isArray ? value : []);
  const valid = isArray && all(prop('valid'), holders);
  const invalid = !valid;
  const getValue = () => (isArray ? map(({ getValue }) => getValue(), holders) : []);
  return { valid, invalid, getValue };
};

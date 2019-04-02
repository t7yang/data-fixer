import { all, map, not } from 'ramda';
import { wrapIf } from '../validators/_wrap-if';
import { Control, Holder } from './type';

type ArrayControl = <T>(ctrl: Control<T>) => Control<T, T[]>;

export const actrl: ArrayControl = <T>(ctr: Control<T>) => arr => {
  const holders: Holder<T>[] = map(v => ctr(v), wrapIf(arr));
  const valid = all(({ valid }) => valid, holders);
  const invalid = not(valid);
  const getValue = () => map(({ getValue }) => getValue(), holders);
  return { valid, invalid, getValue };
};

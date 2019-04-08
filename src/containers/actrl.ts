import { all, map, not, pipe, pluck } from 'ramda';
import { Control, Holder } from './type';

type ArrayControl = <T>(ctrl: Control<T>) => Control<T, T[] | Record<string, T>>;

export const actrl: ArrayControl = <T>(ctr: Control<T>) => arr => {
  const holders: Holder<T>[] = map(v => ctr(v), arr);
  const valid = pipe<Holder<T>[], Holder<T>[], boolean[], boolean>(
    Object.values,
    pluck('valid'),
    all(Boolean),
  )(holders);
  const invalid = not(valid);
  const getValue = () => map(({ getValue }) => getValue(), holders);
  return { valid, invalid, getValue };
};

import { all, is, map, not, pipe, pluck } from 'ramda';
import { Control, Holder } from './type';

type ArrayControl = <T>(ctrl: Control<T>) => Control<T, T[] | Record<string, T>>;

export const actrl: ArrayControl = <T>(ctr: Control<T>) => value => {
  const isInvalid = not(is(Object, value));
  const holders: Holder<T>[] = map(v => ctr(v), isInvalid ? [] : value);
  const valid = isInvalid
    ? false
    : pipe<Holder<T>[], Holder<T>[], boolean[], boolean>(
        Object.values,
        pluck('valid'),
        all(Boolean),
      )(holders);
  const invalid = not(valid);
  const getValue = () => map(({ getValue }) => getValue(), holders);
  return { valid, invalid, getValue };
};

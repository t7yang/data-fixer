import { all, map, prop } from 'ramda';
import { isTypeObject } from '../shared/is-type-object';
import { Control } from '../type';

type DictionaryControl = <T>(ctrl: Control<T>) => Control<T, Record<string, T>>;

export const dctrl: DictionaryControl = ctrl => value => {
  const isObject = isTypeObject(value);
  const holders = map(ctrl, isObject ? value : {});
  const valid = isObject && all(prop('valid'), Object.values(holders));
  const invalid = !valid;
  const getValue = () => (isObject ? map(({ getValue }) => getValue(), holders) : {});
  return { valid, invalid, getValue };
};

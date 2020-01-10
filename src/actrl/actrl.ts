import { Control } from '../type';

type ArrayControl = <T>(ctrl: Control<T>) => Control<T[]>;

export const actrl: ArrayControl = ctrl => value => {
  const isArray = Array.isArray(value);

  if (!isArray) return { valid: false, invalid: true, getValue: () => [] };

  const holders = (value as Array<any>).map(ctrl);

  const valid = holders.every(h => h.valid);
  const invalid = !valid;
  const getValue = () => (valid ? value : holders.map(({ getValue }) => getValue()));

  return { valid, invalid, getValue };
};

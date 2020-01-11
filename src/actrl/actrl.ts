import { Control } from '../type';

type ArrayControl = <T>(ctrl: Control<T>) => Control<T[]>;

export const actrl: ArrayControl = ctrl => data => {
  const isArray = Array.isArray(data);

  if (!isArray) return { valid: false, invalid: true, value: () => [] };

  const holders = (data as Array<any>).map(ctrl);

  const valid = holders.every(h => h.valid);
  const invalid = !valid;
  const value = () => (valid ? data : holders.map(({ value }) => value()));

  return { valid, invalid, value };
};

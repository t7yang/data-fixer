import { isNotObject } from '../shared/is-not-object';
import { objMap } from '../shared/obj-map';
import { Control } from '../type';

type RecordControl = <T>(ctrl: Control<T>) => Control<Record<string, T>>;

export const rctrl: RecordControl = ctrl => data => {
  if (isNotObject(data)) return { valid: false, invalid: true, value: () => ({}) };

  const holders = objMap(ctrl, data);

  const valid = Object.values(holders).every(h => h.valid);
  const invalid = !valid;
  const value = () => (valid ? data : objMap(h => h.value(), holders));

  return { valid, invalid, value };
};

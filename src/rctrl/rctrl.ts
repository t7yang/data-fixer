import { isNotObject } from '../shared/is-not-object';
import { objMap } from '../shared/obj-map';
import { Control } from '../type';

type RecordControl = <T>(ctrl: Control<T>) => Control<Record<string, T>>;

export const rctrl: RecordControl = ctrl => value => {
  if (isNotObject(value)) return { valid: false, invalid: true, getValue: () => ({}) };

  const holders = objMap(ctrl, value);

  const valid = Object.values(holders).every(h => h.valid);
  const invalid = !valid;
  const getValue = () => (valid ? value : objMap(h => h.getValue(), holders));

  return { valid, invalid, getValue };
};

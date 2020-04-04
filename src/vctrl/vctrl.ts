import { Control } from '../type';
import { Alt, getAlt } from './get-alt';

export type Vtor = (data: any) => boolean;

export type ValueControl = <T>(vtor: Vtor, alt: Alt<T>) => Control<T>;

export const vctrl: ValueControl = (vtor, alt) => data => {
  const valid = vtor(data);
  return { valid, invalid: !valid, value: () => (valid ? data : getAlt(alt, data)) };
};

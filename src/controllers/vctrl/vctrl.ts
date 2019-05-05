import { all, ap, not, of } from 'ramda';
import { VdtFn } from '../../validators/type';
import { wrapIf } from '../../validators/_wrap-if';
import { Control } from '../type';
import { getAlt } from './get-alt';

type ValueControl = <T>(vdt: VdtFn | VdtFn[], alt: T) => Control<T>;

export const vctrl: ValueControl = (vdt, alt) => (val: any) => {
  const vdts: ((v: any) => boolean)[] = wrapIf(vdt);
  const valid = all(Boolean, ap(vdts, of(val)));
  const invalid = not(valid);
  const getValue = () => (valid ? val : getAlt(alt, val));
  return { valid, invalid, getValue };
};

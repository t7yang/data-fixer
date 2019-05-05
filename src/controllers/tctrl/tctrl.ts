import { all, apply, call, map, prop, zip } from 'ramda';
import { Control, Holder } from '../type';

type TupleControl = (ctrls: Control<any>[]) => Control<any>;

export const tctrl: TupleControl = ctrls => value => {
  const isArray = Array.isArray(value);
  const isLength = isArray && ctrls.length === value.length;
  const input: any[] = isArray ? value : [];
  input.length = ctrls.length;
  const holders = map(apply(call), zip(ctrls, input)) as Holder<any>[];
  const valid = isLength && all(prop('valid'), holders);
  const invalid = !valid;
  const getValue = () => map(({ getValue }) => getValue(), holders);
  return { valid, invalid, getValue };
};

import { all, equals, gt, is, length, map, not, prop, values } from 'ramda';
import { Control, Holder } from './type';
import { devolve } from './_devolve';

type ObjectControl = (struc: Record<string, Control<any>>) => Control<any>;

export const octrl: ObjectControl = (struc: Record<string, Control<any>>) => value => {
  const isNotObject = not(is(Object, value));
  const isInvalid =
    isNotObject || (equals(0, length(values(struc))) && gt(length(values(value)), 0));
  const obj = isNotObject ? {} : value;
  const strucCtrl: Record<string, Holder<any>> = devolve(struc, obj);
  const valid = isInvalid ? false : all(Boolean, map(prop('valid'), values(strucCtrl)));
  const invalid = not(valid);
  const getValue = () => map<any, any>(({ getValue }) => getValue(), strucCtrl);
  return { valid, invalid, getValue };
};

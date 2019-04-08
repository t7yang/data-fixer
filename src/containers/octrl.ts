import { all, map, not, prop, values } from 'ramda';
import { isType } from '../validators/is-type';
import { Control, Holder } from './type';
import { devolve } from './_devolve';

type ObjectControl = (struc: Record<string, Control<any>>) => Control<any>;

export const octrl: ObjectControl = (struc: Record<string, Control<any>>) => raw => {
  const obj = isType(Object) ? raw : {};
  const strucCtrl: Record<string, Holder<any>> = devolve(struc, obj);
  const valid = all(Boolean, map(prop('valid'), values(strucCtrl)));
  const invalid = not(valid);
  const getValue = () => map<any, any>(({ getValue }) => getValue(), strucCtrl);
  return { valid, invalid, getValue };
};

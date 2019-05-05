import { all, map, prop, values } from 'ramda';
import { devolve } from '../shared/devolve';
import { isTypeObject } from '../shared/is-type-object';
import { Control } from '../type';

type ObjectControl = (struc: Record<string, Control<any>>) => Control<any>;

export const octrl: ObjectControl = (schema: Record<string, Control<any>>) => value => {
  const isObject = isTypeObject(value);
  const notEmptyObject = isObject && Object.keys(value).length !== 0;
  const input: Record<string, any> = isObject ? value : {};
  const sHolder = devolve(schema, input);
  const valid = notEmptyObject && all(Boolean, map(prop('valid'), values(sHolder)));
  const invalid = !valid;
  const getValue = () => map<any, any>(({ getValue }) => getValue(), sHolder);
  return { valid, invalid, getValue };
};

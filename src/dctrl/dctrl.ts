import { devolve } from '../shared/devolve';
import { isNotObject } from '../shared/is-not-object';
import { objMap } from '../shared/obj-map';
import { Control, Holder } from '../type';

type DictionaryControl = <T extends Record<string, Control<any>>>(
  schema: T,
) => Control<{ [P in keyof T]: T[P] extends Control<infer U> ? U : never }>;

export const dctrl: DictionaryControl = schema => data => {
  const isObject = !isNotObject(data);
  const isPropsMatch = isObject && Object.keys(schema).length === Object.keys(data).length;
  const subject: Record<string, any> = isObject ? data : {};
  const sHolder = devolve(schema, subject);

  const valid = isPropsMatch && Object.values(sHolder).every(h => h.valid);
  const invalid = !valid;
  const value = () => (valid ? data : objMap((h: Holder<any>) => h.value(), sHolder));

  return { valid, invalid, value };
};

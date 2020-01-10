import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { Control } from '../type';
import { Alt, getAlt } from './get-alt';

export type ValueControl = <T>(schema: JSONSchema7, alt: Alt<T>, opt?: Ajv.Options) => Control<T>;

export const vctrl: ValueControl = (schema, alt, opt) => val => {
  const valid = (ajv => ajv.validate(schema, val) as boolean)(Ajv(opt));
  return { valid, invalid: !valid, getValue: () => (valid ? val : getAlt(alt, val)) };
};

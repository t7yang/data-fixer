import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { Control } from '../type';
import { Alt, getAlt } from './get-alt';

export type ValueControl = <T>(schema: JSONSchema7, alt: Alt<T>, opt?: Ajv.Options) => Control<T>;

export const vctrl: ValueControl = (schema, alt, opt) => data => {
  const valid = (ajv => ajv.validate(schema, data) as boolean)(Ajv(opt));
  return { valid, invalid: !valid, value: () => (valid ? data : getAlt(alt, data)) };
};

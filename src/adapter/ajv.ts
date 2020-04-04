import Ajv, { Options } from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { Vtor } from '../vctrl';

export const ajvAdt = (schema: JSONSchema7, opt?: Options): Vtor => data => {
  return (ajv => ajv.validate(schema, data) as boolean)(Ajv(opt));
};

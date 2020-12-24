import { SchemaOf } from 'yup';
import { ValidateOptions } from 'yup/lib/types';
import { Vtor } from '../vctrl';

export const yupAdt = (schema: SchemaOf<any>, opt?: ValidateOptions): Vtor => data => {
  return schema.isValidSync(data, opt);
};

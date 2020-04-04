import { Schema, ValidateOptions } from 'yup';
import { Vtor } from '../vctrl';

export const yupAdt = (schema: Schema<any>, opt?: ValidateOptions): Vtor => data => {
  return schema.isValidSync(data, opt);
};

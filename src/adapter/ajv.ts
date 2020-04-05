import { ValidateFunction } from 'ajv';
import { Vtor } from '../vctrl';

export const ajvAdt = (vldFn: ValidateFunction): Vtor => data => vldFn(data) as boolean;

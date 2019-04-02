import { isGt } from './is-gt';
import { VdtFnFac } from './type';
import { checkLengthWith } from './_check-length-with';

export const isLgt: VdtFnFac<number> = checkLengthWith(isGt);

import { isGt } from './is-gt';
import { checkLengthWith } from './shared/check-length-with';
import { VdtFnFac } from './type';

export const isLgt: VdtFnFac<number> = checkLengthWith(isGt);

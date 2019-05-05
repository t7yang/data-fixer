import { isLt } from './is-lt';
import { checkLengthWith } from './shared/check-length-with';
import { VdtFnFac } from './type';

export const isLlt: VdtFnFac<number> = checkLengthWith(isLt);

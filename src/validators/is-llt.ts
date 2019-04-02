import { isLt } from './is-lt';
import { VdtFnFac } from './type';
import { checkLengthWith } from './_check-length-with';

export const isLlt: VdtFnFac<number> = checkLengthWith(isLt);

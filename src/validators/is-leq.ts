import { equals } from 'ramda';
import { checkLengthWith } from './shared/check-length-with';
import { VdtFnFac } from './type';

export const isLeq: VdtFnFac<number> = checkLengthWith(equals);

import { equals } from 'ramda';
import { VdtFnFac } from './type';
import { checkLengthWith } from './_check-length-with';

export const isLeq: VdtFnFac<number> = checkLengthWith(equals);

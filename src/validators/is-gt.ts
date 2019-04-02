import { flip, gt } from 'ramda';
import { VdtFnFac } from './type';

export const isGt: VdtFnFac<number> = flip(gt);

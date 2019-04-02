import { flip, lt } from 'ramda';
import { VdtFnFac } from './type';

export const isLt: VdtFnFac<number> = flip(lt);

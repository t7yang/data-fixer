import { flip, gte } from 'ramda';
import { VdtFnFac } from './type';

export const isGte: VdtFnFac<number> = flip(gte);

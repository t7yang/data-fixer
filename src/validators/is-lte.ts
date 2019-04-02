import { flip, lte } from 'ramda';
import { VdtFnFac } from './type';

export const isLte: VdtFnFac<number> = flip(lte);

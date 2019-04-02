import { VdtFnFac } from './type';

export const isPatt: VdtFnFac<RegExp> = (patt: RegExp) => (value: any) => patt.test(value as any);

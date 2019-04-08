import { any, equals } from 'ramda';
import { VdtFnFac } from './type';

export const isOneOf: VdtFnFac<any[]> = (set: any[]) => (v: any) => any(equals(v), set);

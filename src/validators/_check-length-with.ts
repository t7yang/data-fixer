import { call, identity, prop, useWith } from 'ramda';
import { VdtFnFac } from './type';

type CheckLengthWith = (f: VdtFnFac<number>) => VdtFnFac<number>;

export const checkLengthWith: CheckLengthWith = useWith(call, [identity, identity, prop('length')]);

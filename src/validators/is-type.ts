import { always, curryN, equals, ifElse, is } from 'ramda';
import { VdtFnFac } from './type';

type IsType = VdtFnFac<
  typeof Number | typeof String | typeof Boolean | typeof Object | typeof Array
>;

export const isType: IsType = ifElse(equals(Array), always(Array.isArray), curryN(1, is));

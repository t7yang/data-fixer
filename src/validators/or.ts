import { any, ap, identity, of, pipe, useWith } from 'ramda';
import { VdtFn } from './type';

type Or = (vdts: VdtFn[]) => VdtFn;

export const or: Or = useWith(
  pipe(
    ap,
    <any>any(Boolean),
  ),
  [identity, of],
);

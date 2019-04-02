import { defaultTo, of, pipe, unnest } from 'ramda';

type WrapIf = <T>(v: T) => T extends any[] ? T : [T];

export const wrapIf = pipe(
  defaultTo([]),
  of,
  unnest,
) as WrapIf;

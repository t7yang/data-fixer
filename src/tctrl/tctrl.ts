import { Control } from '../type';

type TupleControl = <T extends Control<any>[]>(
  ctrls: T,
) => Control<T extends Control<infer R>[] ? R[] : never>;

export const tctrl: TupleControl = ctrls => value => {
  const isArray = Array.isArray(value);
  const subject: any[] = isArray ? value : [];
  const isLengthMatch = isArray && ctrls.length === value.length;
  const holders = ctrls.map((c, i) => c(subject[i]));

  const valid = isLengthMatch && holders.every(h => h.valid);
  const invalid = !valid;
  const getValue = () =>
    holders.map(h => h.getValue()) as typeof ctrls extends Control<infer R>[] ? R[] : never;

  return { valid, invalid, getValue };
};

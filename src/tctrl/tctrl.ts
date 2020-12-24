import { Control } from '../type';

type TupleControl = <T extends Control<any>[]>(...ctrls: T) => Control<ExtractControls<T>>;

type ExtractControls<T extends Control<any>[]> = T extends []
  ? []
  : T extends [Control<infer R>]
  ? [R]
  : T extends [Control<infer R>, ...infer S]
  ? S extends Control<any>[]
    ? [R, ...ExtractControls<S>]
    : never
  : never;

export const tctrl: TupleControl = (...ctrls) => data => {
  const isArray = Array.isArray(data);
  const subject: any[] = isArray ? data : [];
  const isLengthMatch = isArray && ctrls.length === data.length;
  const holders = ctrls.map((c, i) => c(subject[i]));

  const valid = isLengthMatch && holders.every(h => h.valid);
  const invalid = !valid;
  const value = () => holders.map(h => h.value()) as any;

  return { valid, invalid, value };
};

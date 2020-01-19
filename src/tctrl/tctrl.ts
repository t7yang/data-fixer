import { Control, ExtractControlsValue } from '../type';

type TupleControl = <T extends Control<any>[]>(...ctrls: T) => Control<ExtractControlsValue<T>>;

export const tctrl: TupleControl = (...ctrls) => data => {
  const isArray = Array.isArray(data);
  const subject: any[] = isArray ? data : [];
  const isLengthMatch = isArray && ctrls.length === data.length;
  const holders = ctrls.map((c, i) => c(subject[i]));

  const valid = isLengthMatch && holders.every(h => h.valid);
  const invalid = !valid;
  const value = () =>
    holders.map(h => h.value()) as typeof ctrls extends Control<infer R>[] ? R[] : never;

  return { valid, invalid, value };
};

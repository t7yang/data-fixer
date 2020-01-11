export type Holder<T> = {
  valid: boolean;
  invalid: boolean;
  value: () => T;
};

export type Control<T> = (v: any) => Holder<T>;

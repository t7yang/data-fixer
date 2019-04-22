export type Holder<T> = {
  valid: boolean;
  invalid: boolean;
  getValue: () => T;
};

export type Control<T, U = T> = (v: any) => Holder<U>;

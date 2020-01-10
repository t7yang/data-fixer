export type Holder<T> = {
  valid: boolean;
  invalid: boolean;
  getValue: () => T;
};

export type Control<T> = (v: any) => Holder<T>;

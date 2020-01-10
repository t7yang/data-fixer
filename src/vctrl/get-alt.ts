export type AltFn<T> = (val: any) => T;

export type Alt<T> = T | AltFn<T>;

export type GetAlt = typeof getAlt;

export const getAlt = <T>(alt: Alt<T>, val: any) =>
  typeof alt === 'function' ? (alt as AltFn<T>)(val) : alt;

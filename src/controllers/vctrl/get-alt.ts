type GetAlt = <T>(alt: T, val: unknown) => T extends (v: any) => any ? ReturnType<T> : T;

export const getAlt: GetAlt = (alt, val) => (typeof alt === 'function' ? alt(val) : alt);

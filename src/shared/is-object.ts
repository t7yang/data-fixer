export const isObject = (value: any) => value instanceof Object && typeof value !== 'function' && !Array.isArray(value);

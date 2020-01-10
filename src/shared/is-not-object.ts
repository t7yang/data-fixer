export const isNotObject = (value: any) =>
  Object.prototype.toString.call(value) !== '[object Object]';

import { Control } from '../type';
export const devolve = (struc: Record<string, Control<any>>, raw: any = {}) => {
  const result: Record<string, any> = {};
  Object.entries(struc).forEach(([key, ctrl]) => {
    result[key] = ctrl(raw[key]);
  });
  return result;
};

import { Control } from '../type';

type Devolve = (
  schema: Record<string, Control<any>>,
  raw: Record<string, any>,
) => Record<string, any>;

export const devolve: Devolve = (schema, raw) =>
  Object.entries(schema).reduce(
    (obj, [key, value]) => {
      obj[key] = value(raw[key]);
      return obj;
    },
    {} as Record<string, any>,
  );

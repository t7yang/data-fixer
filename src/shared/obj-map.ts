type ObjectMap = <M extends (v: any) => any, O extends {}>(mapper: M, obj: O) => Record<string, ReturnType<M>>;

export const objMap: ObjectMap = (mapper, obj) =>
  Object.entries(obj).reduce((dic, [key, value]) => {
    dic[key] = mapper(value);
    return dic;
  }, {} as Record<string, ReturnType<typeof mapper>>);

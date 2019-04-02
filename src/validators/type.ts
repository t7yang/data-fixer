export type VdtFn = (value: any) => boolean;

export type VdtFnFac<T> = (t1: T) => VdtFn;

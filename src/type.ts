import { Cast } from 'Any/Cast';
import { Head, Length, Prepend, Reverse, Tail } from 'List/_api';

export type Holder<T> = {
  valid: boolean;
  invalid: boolean;
  value: () => T;
};

export type Control<T> = (v: any) => Holder<T>;

type ExtractControlValue<I extends Control<any>> = I extends Control<infer R> ? R : never;

export type ExtractControlsValue<I extends Control<any>[], O extends any[] = []> = {
  0: Cast<ExtractControlsValue<Tail<I>, Prepend<O, ExtractControlValue<Head<I>>>>, any[]>;
  1: Reverse<O>;
}[Length<I> extends 0 ? 1 : 0];

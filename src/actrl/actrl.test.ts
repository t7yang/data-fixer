import Ajv from 'ajv';
import { ajvAdt } from '../adapter';
import { vctrl } from '../vctrl/vctrl';
import { actrl } from './actrl';

describe('test for actrl', () => {
  const isGt0 = vctrl(ajvAdt(new Ajv().compile({ type: 'number', exclusiveMinimum: 0 })), 1);
  const isGroupGt0 = actrl(isGt0);

  it('actrl should return given value if valid', () => {
    const holder = isGroupGt0([1, 2, 3, 4, 5]);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.value()).toEqual([1, 2, 3, 4, 5]);
  });

  it('actrl should return rectify array if given value invalid', () => {
    const holder = isGroupGt0([-1, 0, 1, 2, -1]);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.value()).toEqual([1, 1, 1, 2, 1]);
  });

  it('actrl should pass empty array as given value', () => {
    const holder = isGroupGt0([]);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.value()).toEqual([]);
  });

  it('actrl should return empty array if given type not array', () => {
    const holder = isGroupGt0({});
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.value()).toEqual([]);
  });
});

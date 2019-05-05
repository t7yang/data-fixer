import { isOneOf } from '../../validators';
import { vctrl } from '../vctrl/vctrl';
import { dctrl } from './dctrl';

describe('test for dctrl', () => {
  const isOnOff = dctrl(vctrl(isOneOf(['on', 'off']), 'on'));

  it('actrl should return given value if valid', () => {
    const holder = isOnOff({ a: 'on', b: 'off', c: 'on' });
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual({ a: 'on', b: 'off', c: 'on' });
  });

  it('actrl should return rectify object if invalid', () => {
    const holder = isOnOff({ a: 'on', b: 'off', c: 123 });
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual({ a: 'on', b: 'off', c: 'on' });
  });

  it('actrl should return empty object if empty object given', () => {
    const holder = isOnOff({});
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual({});
  });

  it('actrl should return empty object if given type not object', () => {
    const holder = isOnOff([]);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual({});
  });
});

import Ajv from 'ajv';
import { ajvAdt } from '../adapter';
import { vctrl } from '../vctrl/vctrl';
import { rctrl } from './rctrl';

describe('test for rctrl', () => {
  const isOnOff = rctrl(vctrl(ajvAdt(new Ajv().compile({ type: 'string', enum: ['on', 'off'] })), 'on'));

  it('rctrl should return given value if valid', () => {
    const holder = isOnOff({ a: 'on', b: 'off', c: 'on' });
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.value()).toEqual({ a: 'on', b: 'off', c: 'on' });
  });

  it('rctrl should return rectify object if invalid', () => {
    const holder = isOnOff({ a: 'on', b: 'off', c: 123 });
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.value()).toEqual({ a: 'on', b: 'off', c: 'on' });
  });

  it('rctrl should return empty object if empty schema given', () => {
    const holder = isOnOff({});
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.value()).toEqual({});
  });

  it('rctrl should return empty object if given type not object', () => {
    const holder = isOnOff([]);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.value()).toEqual({});
  });
});

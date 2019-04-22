import { isEq, isType } from '../validators';
import { octrl } from './octrl';
import { vctrl } from './vctrl';

describe('octrl should pass test', () => {
  const ctrl = octrl({
    version: vctrl(isEq(2), 2),
    menus: octrl({
      enabled: vctrl(isType(Boolean), false),
      clipboard: vctrl(isType(Boolean), true),
    }),
  });
  const DEF = { version: 2, menus: { enabled: false, clipboard: true } };

  it('octrl should return original object if valid', () => {
    const original = { version: 2, menus: { enabled: true, clipboard: true } };
    const holder = ctrl(original);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual(original);
  });

  it('octrl should return fixed object if value invalid', () => {
    const holder = ctrl({ version: 1, menus: { enabled: null, clipboard: 123 } });
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual(DEF);
  });

  it('octrl should return default object if key invalid', () => {
    const holder = ctrl({});
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual(DEF);
  });

  it('octrl should return empty object if validator is empty', () => {
    const ctrl = octrl({});
    const holder = ctrl({});
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual({});
  });

  it('octrl should report invalid if validator is empty with invalid input', () => {
    const ctrl = octrl({});
    const holder = ctrl({ a: 1 });
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual({});
  });
});

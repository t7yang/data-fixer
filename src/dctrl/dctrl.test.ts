import { vctrl } from '../vctrl/vctrl';
import { dctrl } from './dctrl';

describe('dctrl should pass test', () => {
  const ctrl = dctrl({
    version: vctrl({ type: 'number', const: 2 }, 2),
    menus: dctrl({
      enabled: vctrl({ type: 'boolean' }, false),
      clipboard: vctrl({ type: 'boolean' }, true),
    }),
  });

  const DEFAULT = { version: 2, menus: { enabled: false, clipboard: true } };

  it('dctrl should return original object if valid', () => {
    const original = { version: 2, menus: { enabled: true, clipboard: true } };
    const holder = ctrl(original);

    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.value()).toEqual(original);
  });

  it('dctrl should return fixed object if value invalid', () => {
    const holder = ctrl({ version: 1, menus: { enabled: null, clipboard: 123 } });

    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.value()).toEqual(DEFAULT);
  });

  it('dctrl should return default object if key invalid', () => {
    const holder = ctrl({});

    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.value()).toEqual(DEFAULT);
  });
});

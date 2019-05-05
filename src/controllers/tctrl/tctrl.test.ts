import { isEq } from '../../validators';
import { vctrl } from '../vctrl/vctrl';
import { tctrl } from './tctrl';

describe('test for tctrl', () => {
  const isOnOff = tctrl([vctrl(isEq('on'), 'on'), vctrl(isEq('off'), 'off')]);

  it('tctrl should return given value if valid', () => {
    const holder = isOnOff(['on', 'off']);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual(['on', 'off']);
  });

  it('tctrl should return rectify tuple if invalid', () => {
    const holder = isOnOff([1, 2]);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual(['on', 'off']);
  });

  it('tctrl should return rectify tuple if empty tuple given', () => {
    const holder = isOnOff([]);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual(['on', 'off']);
  });

  it('tctrl should return rectify tuple if given type not tuple', () => {
    const holder = isOnOff('123');
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual(['on', 'off']);
  });
});

import { isGt } from '../validators';
import { vctrl } from './vctrl';

const alt = 1;
const isGtZero = vctrl(isGt(0), alt);

describe('test for vctrl in valid status', () => {
  it('vctrl should pass test in valid status', () => {
    const target = 5;
    const holder = isGtZero(target);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toBe(5);
  });
});

describe('test for vctrl in invalid status', () => {
  it('vctrl should pass test in invalid status', () => {
    const target = -1;
    const holder = isGtZero(target);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toBe(alt);
  });
});

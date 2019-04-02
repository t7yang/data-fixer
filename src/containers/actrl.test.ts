import { isGt } from '../validators';
import { actrl } from './actrl';
import { vctrl } from './vctrl';

const isGt0 = vctrl(isGt(0), 1);
const isGroupGt0 = actrl(isGt0);

describe('test for actrl', () => {
  it('actrl should pass valid case', () => {
    const holder = isGroupGt0([1, 2, 3, 4, 5]);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual([1, 2, 3, 4, 5]);
  });

  it('actrl should pass invalid case', () => {
    const holder = isGroupGt0([-1, 0, 1, 2, -1]);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toEqual([1, 1, 1, 2, 1]);
  });

  it('actrl should pass empty array input case', () => {
    const holder = isGroupGt0([]);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toEqual([]);
  });
});

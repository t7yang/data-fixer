import { vctrl } from './vctrl';

describe('test for vctrl when alt if not a function', () => {
  const alt = 1;
  const isGtZero = vctrl({ type: 'number', exclusiveMinimum: 0 }, alt);

  it('vctrl should return given value if valid', () => {
    const target = 5;
    const holder = isGtZero(target);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toBe(5);
  });

  it('vctrl should return alt if given value not valid', () => {
    const target = 0;
    const holder = isGtZero(target);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toBe(alt);
  });
});

describe('test for vctrl when alt is function', () => {
  const altFn = (p: any) => (typeof p === 'number' ? Math.abs(p) + 1 : 1);
  const isGtZero = vctrl({ type: 'number', minimum: 0 }, altFn);

  it('vctrl should return given value if valid', () => {
    const holder = isGtZero(2);
    expect(holder.valid).toBe(true);
    expect(holder.invalid).toBe(false);
    expect(holder.getValue()).toBe(2);
  });

  it('vctrl should return 1 if given value not type number', () => {
    const holder = isGtZero('asdf');
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toBe(1);
  });

  it('vctrl should return abs + 1 if given value is type number', () => {
    const holder = isGtZero(-7);
    expect(holder.valid).toBe(false);
    expect(holder.invalid).toBe(true);
    expect(holder.getValue()).toBe(8);
  });
});

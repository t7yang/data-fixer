import { isOneOf } from './is-one-of';

describe('isOneOf should pass test', () => {
  it('isOneOf should return true if valid', () => {
    expect(isOneOf([1, 2, 3])(1)).toBe(true);
  });

  it('isOneOf should return false if invalid', () => {
    expect(isOneOf([1, 2, 3])(0)).toBe(false);
  });
});

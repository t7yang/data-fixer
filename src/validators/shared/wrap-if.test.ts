import { wrapIf } from './wrap-if';

describe('wrapIf should pass test', () => {
  it('wrapIf should return [] with viod argument', () => {
    expect(wrapIf(undefined)).toEqual([]);
  });

  it('wrapIf should return wrapper with no wrap', () => {
    expect(wrapIf('a')).toEqual(['a']);
  });

  it('wrapIf should return a level wrap with wraped argument', () => {
    expect(wrapIf(['a'])).toEqual(['a']);
  });
});

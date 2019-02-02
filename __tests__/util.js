import init from '../src/actions/init';
import clear from '../src/actions/clear';

export function shouldThrowIfNotInitialized (fn) {
  it('should throw if not initialized', () => {
    expect(fn).toThrow('Cloud link not initialized');
  });
}

export function wrapInitialization (uninitialized, initialized) {
  describe('uninitialized', () => {
    shouldThrowIfNotInitialized(uninitialized);
  });

  describe('initialized', () => {
    beforeAll(() => {
      init('.');
    });

    afterAll(() => {
      clear();
    });

    initialized();
  });
}
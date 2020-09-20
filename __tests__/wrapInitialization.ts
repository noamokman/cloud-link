import init from '../src/actions/init';
import clear from '../src/actions/clear';

export default (uninitialized, initialized) => {
  describe('uninitialized', () => {
    it('should throw if not initialized', () => {
      expect(uninitialized).toThrow('Cloud link not initialized');
    });
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
};
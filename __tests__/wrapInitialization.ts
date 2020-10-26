import init from '../src/actions/init';
import clear from '../src/actions/clear';

export default (uninitialized: () => any, initialized: () => any) => {
  describe('uninitialized', () => {
    it('should throw or reject if not initialized', async () => {
      await expect(async () => uninitialized()).rejects.toThrowError('Cloud link not initialized');
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
import clear from '../../src/actions/clear';
import init from '../../src/actions/init';
import initialized from '../../src/actions/initialized';

describe('cloud-link', () => {
  describe('initialized', () => {
    afterAll(() => {
      clear();
    });

    it('should not be initialized on start', () => {
      expect(initialized()).toBe(false);
    });

    it('should be initialized after init', () => {
      init('.');

      expect(initialized()).toBe(true);
    });
  });
});
import init from '../../src/actions/init';
import initialized from '../../src/actions/initialized';
import clear from '../../src/actions/clear';

describe('cloud-link', () => {
  describe('clear', () => {
    it('should clear initialization', () => {
      init('.');
      expect(initialized()).toBe(true);
      clear();
      expect(initialized()).toBe(false);
    });
  });
});
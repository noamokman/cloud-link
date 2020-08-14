import info from '../../src/actions/info';

describe('cloud-link', () => {
  describe('info', () => {
    it('should get the configuration', () => {
      const config = info();

      expect(config).toHaveProperty('cloudPath');
    });
  });
});
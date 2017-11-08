import * as cloudLink from '../src';

describe('cloud-link', () => {
  describe('exports', () => {
    it('should expose a list function', () => {
      expect(typeof cloudLink.list).toBe('function');
    });

    it('should expose a status function', () => {
      expect(typeof cloudLink.status).toBe('function');
    });

    it('should expose an initialized function', () => {
      expect(typeof cloudLink.initialized).toBe('function');
    });

    it('should expose a clear function', () => {
      expect(typeof cloudLink.clear).toBe('function');
    });

    it('should expose a clean function', () => {
      expect(typeof cloudLink.clean).toBe('function');
    });

    it('should expose an init function', () => {
      expect(typeof cloudLink.init).toBe('function');
    });

    it('should expose an add function', () => {
      expect(typeof cloudLink.add).toBe('function');
    });

    it('should expose an apply function', () => {
      expect(typeof cloudLink.apply).toBe('function');
    });
  });
});

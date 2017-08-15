import {resolve} from 'path';
import {shouldThrowIfNotInitilized} from './util';
import {list, status, initialized, clear, init, add, clean} from '../src';

describe('cloud-link', () => {
  describe('exports', () => {
    it('should expose a list function', () => {
      expect(typeof list).toBe('function');
    });

    it('should expose a status function', () => {
      expect(typeof status).toBe('function');
    });

    it('should expose an initialized function', () => {
      expect(typeof initialized).toBe('function');
    });

    it('should expose a clear function', () => {
      expect(typeof clear).toBe('function');
    });

    it('should expose a clean function', () => {
      expect(typeof clean).toBe('function');
    });

    it('should expose an init function', () => {
      expect(typeof init).toBe('function');
    });

    it('should expose an add function', () => {
      expect(typeof add).toBe('function');
    });
  });

  describe('initialized', () => {
    it('should not be initialized on start', () => {
      expect(initialized()).toBe(false);
    });

    it('should be initialized after init', () => {
      init('.');

      expect(initialized()).toBe(true);
    });
  });

  describe('clear', () => {
    it('should clear initialization', () => {
      expect(initialized()).toBe(true);
      clear();
      expect(initialized()).toBe(false);
    });
  });

  describe('add', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    it('should throw if invalid values initialized', () => {
      clear();

      return expect(() => add()).toThrow(TypeError);
    });

    shouldThrowIfNotInitilized(() => add(link));

    it('should return a resolved promise', () => {
      return expect(add(link)).resolves.toBeUndefined();
    });
  });

  describe('list', () => {
    shouldThrowIfNotInitilized(() => list());

    it('should return a promise to an array', () => {
      return list()
        .then(links => {
          expect(Array.isArray(links)).toBeTruthy();
          expect(links).toHaveLength(1);

          const [link] = links;

          expect(link).toMatchObject({name: 'lol', src: 'lol.txt'});
          expect(Object.keys(link.dest).find(key => link.dest[key] === 'lol2.txt')).toBeTruthy();
        });
    });
  });

  describe('status', () => {
    shouldThrowIfNotInitilized(() => status());

    it('should show status of missing', () => {
      return status()
        .then(links => {
          expect(Array.isArray(links)).toBeTruthy();
          expect(links).toHaveLength(1);

          const [link] = links;

          expect(link).toMatchObject({
            name: 'lol',
            src: resolve('lol.txt'),
            dest: resolve('lol2.txt'),
            status: 'missing'
          });
        });
    });
  });

  describe('clean', () => {
    it('should delete the config file', () => clean().then(() => expect(list()).resolves.toHaveLength(0)));
  });
});

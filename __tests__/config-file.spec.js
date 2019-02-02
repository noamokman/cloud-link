import {resolve} from 'path';
import {vol} from 'memfs';
import * as configFile from '../src/config-file';
import {wrapInitialization} from './util';

jest.mock('fs');

describe('cloud-link', () => {
  describe('configFile', () => {
    describe('exports', () => {
      it('should expose a defaultConfigName string', () => {
        expect(typeof configFile.defaultConfigName).toBe('string');
      });

      it('should expose a defaultTemplate object', () => {
        expect(typeof configFile.defaultTemplate).toBe('object');
      });

      it('should expose a getPath function', () => {
        expect(typeof configFile.getPath).toBe('function');
      });

      it('should expose a get function', () => {
        expect(typeof configFile.get).toBe('function');
      });

      it('should expose a set function', () => {
        expect(typeof configFile.set).toBe('function');
      });

      it('should expose a clean function', () => {
        expect(typeof configFile.clean).toBe('function');
      });
    });

    describe('getPath', () => {
      wrapInitialization(() => configFile.getPath(), () => {
        it('should return a valid path', () => {
          expect(configFile.getPath()).toBe(resolve('.', '.cloud-link.json'));
        });
      });
    });

    describe('get', () => {
      wrapInitialization(() => configFile.get(), () => {
        afterEach(() => {
          vol.reset();
        });

        it('should reject on error', () => {
          vol.fromJSON({
            [configFile.getPath()]: {}
          });

          return expect(configFile.get()).rejects.toHaveProperty('code', 'EISDIR');
        });

        it('should return the template on missing file', () => configFile.get()
          .then(config => {
            expect(config).toEqual(configFile.defaultTemplate);
          }));

        it('should return the file contents', () => {
          const file = {links: [{name: 'test'}]};

          vol.fromJSON({
            [configFile.getPath()]: JSON.stringify(file)
          });

          return configFile.get()
            .then(config => {
              expect(config).toMatchObject(file);
            });
        });
      });
    });

    describe('set', () => {
      wrapInitialization(() => configFile.set(), () => {
        it('should save the data', () => {
          const file = {links: [{name: 'lol'}]};

          return configFile.set(file)
            .then(() => configFile.get())
            .then(config => {
              expect(config).toMatchObject(file);
            });
        });
      });
    });


    describe('clean', () => {
      wrapInitialization(() => configFile.clean(), () => {
        it('should delete the file', () => {
          const file = {links: [{name: 'lol'}]};

          return configFile.set(file)
            .then(() => configFile.clean())
            .then(() => configFile.get())
            .then(config => {
              expect(config).toEqual(configFile.defaultTemplate);
            });
        });
      });
    });
  });
});

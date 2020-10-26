import {resolve} from 'path';
import {vol} from 'memfs';
import * as configFile from '../src/config-file';
import wrapInitialization from './wrapInitialization';

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

        it('should return the template on missing file', async () => {
          const config = await configFile.get()

          expect(config).toEqual(configFile.defaultTemplate);
        });

        it('should return the file contents', async () => {
          const file = {links: [{name: 'test'}]};

          vol.fromJSON({
            [configFile.getPath()]: JSON.stringify(file)
          });

          const config = await configFile.get()

          expect(config).toMatchObject(file);
        });
      });
    });

    describe('set', () => {
      wrapInitialization(() => configFile.set({links: {}}), () => {
        it('should save the data', async () => {
          const file = {links: {lol: {src: '', dest: {}}}};

          await configFile.set(file);
          const config = await configFile.get();
          expect(config).toMatchObject(file);
        });
      });
    });


    describe('clean', () => {
      wrapInitialization(() => configFile.clean(), () => {
        it('should delete the file', async () => {
          const file = {links: {lol: {src: '', dest: {}}}};

          await configFile.set(file);
          await configFile.clean();
          const config = await configFile.get();
          expect(config).toEqual(configFile.defaultTemplate);
        });
      });
    });
  });
});

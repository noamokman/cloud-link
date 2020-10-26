import {_clearMocks, _registerMock} from 'lnfs';
import {vol} from 'memfs';
import wrapInitialization from '../wrapInitialization';
import add from '../../src/actions/add';
import apply from '../../src/actions/apply';

jest.mock('fs');

describe('cloud-link', () => {
  describe('apply', () => {
    wrapInitialization(() => apply(), () => {
      const links = [
        {name: 'error', src: 'error.txt', dest: 'error2.txt'},
        {name: 'missing', src: 'missing.txt', dest: 'missing.txt'},
        {name: 'good', src: 'good.txt', dest: 'good2.txt'},
        {name: 'dir', src: 'dir', dest: 'dir2'}
      ];

      beforeAll(() => {
        vol.fromJSON({
          dir: {},
          'error.txt': 'error',
          'good.txt': 'good'
        });

        _registerMock({
          predicate: src => src.includes('error.txt'),
          value: () => Promise.reject(new Error('error'))
        });
      });

      afterAll(() => {
        _clearMocks();
      });

      it('should apply all the links', async () => {
        await add(...links);
        const report = await apply();

        expect(report).toHaveLength(4);

        const [
          error,
          missing,
          good,
          dir
        ] = report;

        expect(error).toHaveProperty('name', error.name);
        expect(error).toHaveProperty('src', error.src);
        expect(error).toHaveProperty('status', 'error');
        expect(error).toHaveProperty('error');
        expect(error.error).toHaveProperty('message', 'error');

        expect(missing).toHaveProperty('name', missing.name);
        expect(missing).toHaveProperty('src', missing.src);
        expect(missing).toHaveProperty('status', 'missing');
        expect(missing).toHaveProperty('error');
        expect(missing.error).toHaveProperty('code', 'ENOENT');

        expect(good).toHaveProperty('name', good.name);
        expect(good).toHaveProperty('src', good.src);
        expect(good).toHaveProperty('status', 'linked');
        expect(good).not.toHaveProperty('error');

        expect(dir).toHaveProperty('name', dir.name);
        expect(dir).toHaveProperty('src', dir.src);
        expect(dir).toHaveProperty('status', 'linked');
        expect(dir).not.toHaveProperty('error');
      });

      it('should apply given links', async () => {
        await add(...links);
        const report = await apply('good');

        expect(report).toHaveLength(1);

        const [good] = report;

        expect(good).toHaveProperty('name', good.name);
        expect(good).toHaveProperty('src', good.src);
        expect(good).toHaveProperty('status', 'linked');
        expect(good).not.toHaveProperty('error');
      });
    });
  });
});
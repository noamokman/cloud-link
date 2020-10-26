import {resolve} from 'path';
import {vol, fs} from 'memfs';
import wrapInitialization from '../wrapInitialization';
import status from '../../src/actions/status';
import add from '../../src/actions/add';

jest.mock('fs');

const symlinkP = fs.promises.symlink;

describe('cloud-link', () => {
  describe('status', () => {
    wrapInitialization(() => status(), () => {
      beforeAll(() => {
        vol.fromJSON({
          [resolve('missing.txt')]: 'missing',
          [resolve('unlinked2.txt')]: 'unlinked',
          [resolve('wrong3.txt')]: 'wrong',
          [resolve('linked.txt')]: 'linked'
        });
      });

      it('should show status of missing', async () => {
        const link = {
          name: 'missing',
          src: 'missing.txt',
          dest: 'missing2.txt'
        };

        await add(link);

        const links = await status();

        expect(Array.isArray(links)).toBeTruthy();
        expect(links).toHaveLength(1);

        const [missing] = links;

        expect(missing).toMatchObject({
          name: link.name,
          src: resolve(link.src),
          dest: resolve(link.dest),
          status: 'missing'
        });
      });

      it('should show status of unlinked', async () => {
        const link = {
          name: 'unlinked',
          src: 'unlinked.txt',
          dest: 'unlinked2.txt'
        };

        await add(link);
        const links = await status();

        expect(Array.isArray(links)).toBeTruthy();
        expect(links).toHaveLength(2);

        const [, unlinked] = links;

        expect(unlinked).toMatchObject({
          name: link.name,
          src: resolve(link.src),
          dest: resolve(link.dest),
          status: 'unlinked'
        });
      });

      it('should show status of wrong', async () => {
        const link = {
          name: 'wrong',
          src: 'wrong.txt',
          dest: 'wrong2.txt'
        };

        await symlinkP(resolve('wrong3.txt'), resolve('wrong2.txt'));
        await add(link);

        const links = await status();

        expect(Array.isArray(links)).toBeTruthy();
        expect(links).toHaveLength(3);

        const [, , wrong] = links;

        expect(wrong).toMatchObject({
          name: link.name,
          src: resolve(link.src),
          dest: resolve(link.dest),
          status: 'wrong'
        });
      });

      it('should show status of linked', async () => {
        const link = {
          name: 'linked',
          src: 'linked.txt',
          dest: 'linked2.txt'
        };

        await symlinkP(resolve(link.src), resolve('linked2.txt'));
        await add(link);

        const links = await status();

        expect(Array.isArray(links)).toBeTruthy();
        expect(links).toHaveLength(4);

        const [, , , linked] = links;

        expect(linked).toMatchObject({
          name: link.name,
          src: resolve(link.src),
          dest: resolve(link.dest),
          status: 'linked'
        });
      });

      it('should show status by name', async () => {
        const links = await status('linked');

        expect(Array.isArray(links)).toBeTruthy();
        expect(links).toHaveLength(1);
      });
    });
  });
});
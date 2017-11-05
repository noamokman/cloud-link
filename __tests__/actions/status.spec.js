import {wrapInitialization, mockFs} from '../util';
import status from '../../src/actions/status';
import add from '../../src/actions/add';
import {resolve} from 'path';
import {symlink} from 'fs';
import pify from 'pify';

const symlinkP = pify(symlink);

describe('cloud-link', () => {
  describe('status', () => {
    wrapInitialization(() => status(), () => {
      mockFs({
        [resolve('missing.txt')]: 'missing',
        [resolve('unlinked2.txt')]: 'unlinked',
        [resolve('wrong3.txt')]: 'wrong',
        [resolve('linked.txt')]: 'linked'
      });

      it('should show status of missing', () => {
        const link = {
          name: 'missing',
          src: 'missing.txt',
          dest: 'missing2.txt'
        };

        return add(link)
          .then(status)
          .then(links => {
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
      });

      it('should show status of unlinked', () => {
        const link = {
          name: 'unlinked',
          src: 'unlinked.txt',
          dest: 'unlinked2.txt'
        };

        return add(link)
          .then(status)
          .then(links => {
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
      });

      it('should show status of wrong', () => {
        const link = {
          name: 'wrong',
          src: 'wrong.txt',
          dest: 'wrong2.txt'
        };

        return symlinkP(resolve('wrong3.txt'), resolve('wrong2.txt'))
          .then(() => add(link))
          .then(status)
          .then(links => {
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
      });

      it('should show status of linked', () => {
        const link = {
          name: 'linked',
          src: 'linked.txt',
          dest: 'linked2.txt'
        };

        return symlinkP(resolve(link.src), resolve('linked2.txt'))
          .then(() => add(link))
          .then(status)
          .then(links => {
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
      });
    });
  });
});
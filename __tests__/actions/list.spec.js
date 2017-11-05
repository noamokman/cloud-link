import {wrapInitialization, mockFs} from '../util';
import add from '../../src/actions/add';
import list from '../../src/actions/list';

describe('cloud-link', () => {
  describe('list', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    wrapInitialization(() => list(), () => {
      mockFs();

      it('should return an array with the link', () => add(link)
        .then(() => list())
        .then(list => {
          expect(list).toHaveLength(1);
          expect(list[0]).toHaveProperty('name', link.name);
          expect(list[0]).toHaveProperty('src', link.src);
          expect(list[0]).toHaveProperty('dest');
          expect(list[0].dest[0]).toBe(list.dest);
        }));
    });
  });
});
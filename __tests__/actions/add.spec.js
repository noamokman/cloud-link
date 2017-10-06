import {wrapInitialization, mockFs} from '../util';
import add from '../../src/actions/add';
import list from '../../src/actions/list';

describe('cloud-link', () => {
  describe('add', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    wrapInitialization(() => add(link), () => {
      mockFs();

      it('should throw if invalid values initialized', () => expect(() => add()).toThrow(TypeError));

      it('should add the link', () => add(link)
        .then(() => list())
        .then(list => {
          expect(list).toHaveLength(1);
          expect(list[0]).toHaveProperty('name', link.name);
          expect(list[0]).toHaveProperty('src', link.src);
        }));
    });
  });
});
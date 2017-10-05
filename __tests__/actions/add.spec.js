import {shouldThrowIfNotInitilized, mockFs} from '../util';
import add from '../../src/actions/add';
import init from '../../src/actions/init';
import list from '../../src/actions/list';

describe('cloud-link', () => {
  describe('add', () => {
    mockFs();

    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    shouldThrowIfNotInitilized(() => add(link));

    it('should throw if invalid values initialized', () => expect(() => add()).toThrow(TypeError));

    it('should add the link', () => {
      init('.');

      return add(link)
        .then(() => list())
        .then(list => {
          expect(list).toHaveLength(1);
          expect(list[0]).toHaveProperty('name', link.name);
          expect(list[0]).toHaveProperty('src', link.src);
        });
    });
  });
});
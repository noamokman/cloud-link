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

      it('should reject conflicts', () => {
        const links = [
          {name: 'bla', src: 'bla.txt', dest: 'bla2.txt'},
          {name: 'bla', src: 'asdf.txt', dest: 'asdf2.txt'}
        ];

        return expect(add(...links)).rejects.toHaveProperty('message', 'Trying to add conflicting links. try to remove the link first.');
      });

      it('should add multiple links', () => {
        const links = [
          {name: 'bla', src: 'bla.txt', dest: 'bla2.txt'},
          {name: 'asdf', src: 'asdf.txt', dest: 'asdf2.txt'}
        ];

        return add(...links)
          .then(() => list())
          .then(list => {
            expect(list).toHaveLength(3);
            expect(list[0]).toHaveProperty('name', link.name);
            expect(list[0]).toHaveProperty('src', link.src);

            expect(list[1]).toHaveProperty('name', links[0].name);
            expect(list[1]).toHaveProperty('src', links[0].src);

            expect(list[2]).toHaveProperty('name', links[1].name);
            expect(list[2]).toHaveProperty('src', links[1].src);
          });
      });
    });
  });
});
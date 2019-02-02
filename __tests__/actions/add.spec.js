import {vol} from 'memfs';
import {wrapInitialization} from '../util';
import add from '../../src/actions/add';
import list from '../../src/actions/list';

jest.mock('fs');

describe('cloud-link', () => {
  describe('add', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    wrapInitialization(() => add(link), () => {
      afterAll(() => {
        vol.reset();
      });

      it('should throw if invalid values initialized', () => {
        expect(() => add()).toThrow(TypeError);
      });

      it('should add the link', async () => {
        await add(link);

        const data = await list();

        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty('name', link.name);
        expect(data[0]).toHaveProperty('src', link.src);
      });

      it('should reject conflicts', () => {
        const links = [
          {name: 'bla', src: 'bla.txt', dest: 'bla2.txt'},
          {name: 'bla', src: 'asdf.txt', dest: 'asdf2.txt'}
        ];

        return expect(add(...links)).rejects.toHaveProperty('message', 'Trying to add conflicting links. try to remove the link first.');
      });

      it('should add multiple links', async () => {
        const links = [
          {name: 'bla', src: 'bla.txt', dest: 'bla2.txt'},
          {name: 'asdf', src: 'asdf.txt', dest: 'asdf2.txt'}
        ];

        await add(...links);

        const data = await list();

        expect(data).toHaveLength(3);
        expect(data[0]).toHaveProperty('name', link.name);
        expect(data[0]).toHaveProperty('src', link.src);

        expect(data[1]).toHaveProperty('name', links[0].name);
        expect(data[1]).toHaveProperty('src', links[0].src);

        expect(data[2]).toHaveProperty('name', links[1].name);
        expect(data[2]).toHaveProperty('src', links[1].src);
      });
    });
  });
});
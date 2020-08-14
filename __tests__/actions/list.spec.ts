import {wrapInitialization} from '../util';
import add from '../../src/actions/add';
import list from '../../src/actions/list';

jest.mock('fs');

describe('cloud-link', () => {
  describe('list', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    wrapInitialization(() => list(), () => {
      it('should return an array with the link', async () => {
        await add(link);

        const data = await list();

        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty('name', link.name);
        expect(data[0]).toHaveProperty('src', link.src);
        expect(data[0]).toHaveProperty('dest');
        expect(data[0].dest[0]).toBe(data.dest);
      });
    });
  });
});
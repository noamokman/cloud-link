import add from '../../src/actions/add';
import list from '../../src/actions/list';
import clean from '../../src/actions/clean';
import {wrapInitialization} from '../util';

jest.mock('fs');

describe('cloud-link', () => {
  describe('clean', () => {
    wrapInitialization(() => clean(), () => {
      it('should delete the config file', async () => {
        const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

        await add(link);
        const data = await list();

        expect(data).toHaveLength(1);

        await clean();
        const newList = await list();

        expect(newList).toHaveLength(0);
      });
    });
  });
});
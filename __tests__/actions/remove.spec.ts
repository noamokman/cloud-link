import wrapInitialization from '../wrapInitialization';
import remove from '../../src/actions/remove';
import add from '../../src/actions/add';
import list from '../../src/actions/list';
import {set} from '../../src/config-file';

jest.mock('fs');

describe('cloud-link', () => {
  describe('remove', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    wrapInitialization(() => remove({name: link.name}), () => {
      it('should throw if invalid values initialized', () => expect(() => remove()).rejects.toThrow(TypeError));

      it('should throw if missing link', () => expect(remove({name: 'missing'})).rejects.toHaveProperty('message', 'Trying to remove link named \'missing\' but none were found.'));

      it('should remove a link', async () => {
        await add(link);
        await remove({name: link.name});

        const links = await list();

        expect(links).toHaveLength(0);
      });

      it('should only remove a link on this pc', async () => {
        await set({
          links: {
            lol: {
              src: 'lol.txt', dest: {
                otherPC: 'lol2.txt'
              }
            }
          }
        });
        await add(link);
        await remove({
          name: link.name
        });

        const links = await list();

        expect(links).toHaveLength(1);
        expect(links[0].dest.otherPC).toEqual('lol2.txt');
      });

      it('should remove all links', async () => {
        await set({
          links: {
            lol: {
              src: 'lol.txt', dest: {
                otherPC: 'lol2.txt'
              }
            }
          }
        });
        await add(link);
        await remove({
          name: link.name,
          all: true
        });

        const links = await list();

        expect(links).toHaveLength(0);
      });
    });
  });
});
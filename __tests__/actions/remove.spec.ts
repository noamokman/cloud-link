import {wrapInitialization} from '../util';
import remove from '../../src/actions/remove';
import add from '../../src/actions/add';
import list from '../../src/actions/list';
import {set} from '../../src/config-file';

jest.mock('fs');

describe('cloud-link', () => {
  describe('remove', () => {
    const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

    wrapInitialization(() => remove({name: link.name}), () => {
      it('should throw if invalid values initialized', () => expect(() => remove()).toThrow(TypeError));

      it('should throw if missing link', () => expect(remove({name: 'missing'})).rejects.toHaveProperty('message', 'Trying to remove link named \'missing\' but none were found.'));

      it('should remove a link', () => add(link)
        .then(() => remove({name: link.name}))
        .then(() => list())
        .then(list => {
          expect(list).toHaveLength(0);
        }));

      it('should only remove a link on this pc', () => set({
        links: {
          lol: {
            src: 'lol.txt', dest: {
              OtherPC: 'lol2.txt'
            }
          }
        }
      })
        .then(() => add(link))
        .then(() => remove({
          name: link.name
        }))
        .then(() => list())
        .then(list => {
          expect(list).toHaveLength(1);
          expect(list[0].dest.OtherPC).toEqual('lol2.txt');
        }));

      it('should remove all links', () => set({
        links: {
          lol: {
            src: 'lol.txt', dest: {
              OtherPC: 'lol2.txt'
            }
          }
        }
      })
        .then(() => add(link))
        .then(() => remove({
          name: link.name,
          all: true
        }))
        .then(() => list())
        .then(list => {
          expect(list).toHaveLength(0);
        }));
    });
  });
});
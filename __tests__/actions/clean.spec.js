import add from '../../src/actions/add';
import list from '../../src/actions/list';
import clean from '../../src/actions/clean';
import {mockFs, wrapInitialization} from '../util';

describe('cloud-link', () => {
  describe('clean', () => {
    wrapInitialization(() => clean(), () => {
      mockFs();

      it('should delete the config file', () => {
        const link = {name: 'lol', src: 'lol.txt', dest: 'lol2.txt'};

        return add(link)
          .then(() => list())
          .then(list => {
            expect(list).toHaveLength(1);

            return clean();
          })
          .then(() => list())
          .then(list => {
            expect(list).toHaveLength(0);
          });
      });
    });
  });
});
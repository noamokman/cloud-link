import {resolve} from 'path';
import init from '../../src/actions/init';
import clear from '../../src/actions/clear';
import store from '../../src/store';

describe('cloud-link', () => {
  describe('init', () => {
    afterAll(() => {
      clear();
    });

    it('should set the cloud path', () => {
      init('.');

      expect(store.get('cloudPath')).toBe(resolve('.'));
    });
  });
});
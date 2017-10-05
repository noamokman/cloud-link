import store from '../store';
import {resolve} from 'path';

export default path => {
  store.set('cloudPath', resolve(path));
};

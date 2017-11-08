import {resolve} from 'path';
import store from '../store';

export default path => {
  store.set('cloudPath', resolve(path));
};

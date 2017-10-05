import {hostname} from 'os';
import {get, set} from '../config-file';

export default ({name, src, dest} = {}) => {
  if (typeof name !== 'string' || typeof src !== 'string' || typeof dest !== 'string') {
    throw new TypeError('name, src and dest must be of type string');
  }

  return get()
    .then(data => {
      const {links} = data;

      links[name] = {src, dest: {[hostname()]: dest}};

      return set(data);
    });
};

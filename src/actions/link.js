import {hostname} from 'os';
import {get, set} from '../config-file';

export default ({name, dest}) => get()
  .then(data => {
    const {links} = data;

    links[name].dest[hostname()] = dest;

    return set(data);
  });
import {get} from '../config-file';

export default () => get()
  .then(({links}) => Object.keys(links)
    .map(name => ({name, ...links[name]})));

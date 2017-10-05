import {get} from '../config-file';

export default () => get()
  .then(({links}) => Object.keys(links)
    .map(name => {
      const link = links[name];

      return {name, ...link};
    }));

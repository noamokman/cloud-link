import {registerCommand} from '../util';
import {add, list} from '../..';

const getSrcByName = name => {
  const link = list().find(link => link.name === name);

  return link && link.src;
};

registerCommand({
  initialization: true,
  name: 'add',
  description: 'Add a new link',
  args: [['<name>', 'name of the link'], ['[src]', 'link source'], ['<dest>', 'link destination']],
  action ({args: {name, src, dest}, logger}) {
    src = src || getSrcByName(name);

    if (!src) {
      return Promise.reject(new TypeError('Could not find the source from the given name, that means this is a new link and need to be provided with the source as well.'));
    }

    return add({name, src, dest})
      .then(() => {
        logger.info();
      });
  }
});
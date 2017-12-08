import {BOOL} from 'caporal';
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
  args: [['<name>', 'name of the link'], ['[src]', 'relative path to source inside the cloud folder'], ['<dest>', 'path to the destination']],
  opts: [['-a, --apply', 'apply the link', BOOL, true]],
  action ({options: {apply}, args: {name, src, dest}, logger}) {
    src = src || getSrcByName(name);

    if (!src) {
      return Promise.reject(new TypeError('Could not find the source from the given name, that means this is a new link and need to be provided with the source as well.'));
    }

    return add({name, src, dest, apply})
      .then(report => {
        logger.info(`Link ${name} added successfully!`);

        if (apply) {
          const [{src, dest}] = report;

          logger.info(`${src} <- ${dest}`);
        }
      });
  }
});
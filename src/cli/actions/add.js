import {BOOL} from 'caporal';
import {registerCommand} from '../util';
import {add, list} from '../..';

const getSrcByName = name => list()
  .then(links => {
    const link = links.find(link => link.name === name);

    return link && link.src;
  });

const resolveSrc = (src, name) => {
  const srcPromise = src ? Promise.resolve(src) : getSrcByName(name);

  return srcPromise
    .then(src => src || Promise.reject(new TypeError('Could not find the source from the given name, that means this is a new link and need to be provided with the source as well.')));
};

registerCommand({
  initialization: true,
  name: 'add',
  description: 'Add a new link',
  args: [['<name>', 'name of the link'], ['[src]', 'relative path to source inside the cloud folder'], ['<dest>', 'path to the destination']],
  opts: [['-a, --apply', 'apply the link', BOOL, true]],
  action ({options: {apply}, args: {name, src, dest}, logger}) {
    if (!dest) {
      dest = src;
      src = null;
    }

    return resolveSrc(src, name)
      .then(src => add({name, src, dest, apply}))
      .then(report => {
        logger.info(`Link ${name} added successfully!`);

        if (apply) {
          const [{src, dest}] = report;

          logger.info(`${src} <- ${dest}`);
        }
      });
  }
});
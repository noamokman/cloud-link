import {BOOL} from 'caporal';
import {registerCommand} from '../util';
import {add, apply, list} from '../..';

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
  action ({options: {apply: shouldApply}, args: {name, src, dest}, logger}) {
    if (!dest) {
      dest = src;
      src = null;
    }

    return resolveSrc(src, name)
      .then(src => add({name, src, dest}))
      .then(() => shouldApply && apply(name))
      .then(report => {
        logger.info(`Link ${name} added successfully!`);

        if (!shouldApply) {
          return;
        }

        const [{src, dest, error}] = report;

        if (error) {
          logger.info(`Link failed to apply! Try to apply again with 'cloud-link apply ${name}'`);
          logger.error(error);

          return;
        }

        logger.info(`${src} <- ${dest}`);
      });
  }
});
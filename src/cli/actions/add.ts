import {BOOL} from 'caporal';
import {registerCommand} from '../util';
import {add, apply, list} from '../..';

const getSrcByName = async (name: string) => {
  const links = await list();

  const link = links.find(link => link.name === name);

  if (!link || !link.src) {
    throw new TypeError('Could not find the source from the given name, that means this is a new link and need to be provided with the source as well.');
  }

  return link.src;
};

registerCommand({
  initialization: true,
  name: 'add',
  description: 'Add a new link',
  args: [['<name>', 'name of the link'], ['[src]', 'relative path to source inside the cloud folder'], ['<dest>', 'path to the destination']],
  opts: [['-a, --apply', 'apply the link', BOOL, true]],
  async action ({options: {apply: shouldApply}, args: {name, src, dest}, logger}) {
    if (!dest) {
      dest = src;
      src = await getSrcByName(name);
    }

    await add({name, src, dest});
    logger.info(`Link ${name} added successfully!`);

    if (!shouldApply) {
      return;
    }

    const [{src: applySrc, dest: applyDest, error}] = await apply(name);

    if (error) {
      logger.info(`Link failed to apply! Try to apply again with 'cloud-link apply ${name}'`);
      logger.error(error);

      return;
    }

    logger.info(`${applySrc} <- ${applyDest}`);
  }
});
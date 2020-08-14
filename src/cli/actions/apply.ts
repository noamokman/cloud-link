import {registerCommand} from '../util';
import {apply} from '../..';

registerCommand({
  initialization: true,
  name: 'apply',
  description: 'Apply all existing links',
  args: [['[names...]', 'names of links to apply']],
  async action ({args: {names = []}, logger}) {
    const links = await apply(...names);

    if (!links.length) {
      logger.info('No links to apply, add some links with `cloud-link add`.');

      return;
    }

    logger.info(links);
  }
});
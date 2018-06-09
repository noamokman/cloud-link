import {registerCommand} from '../util';
import {status} from '../..';

registerCommand({
  initialization: true,
  name: 'status',
  description: 'Show the link status of configured links',
  args: [['[names...]', 'names of links to show']],
  async action ({args: {names = []}, logger}) {
    const links = await status(...names);

    if (!links.length) {
      logger.info('No links found, add some links with `cloud-link add`.');

      return;
    }

    logger.info(links);
  }
});
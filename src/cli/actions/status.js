import {registerCommand} from '../util';
import {status} from '../..';

registerCommand({
  initialization: true,
  name: 'status',
  description: 'Show the link status of configured links',
  args: [['[names...]', 'names of links to show']],
  action ({args: {names = []}, logger}) {
    return status(...names)
      .then(links => {
        if (!links.length) {
          logger.info('No links found, add some links with `cloud-link add`.');

          return;
        }

        logger.info(links);
      });
  }
});
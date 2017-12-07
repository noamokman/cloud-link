import {registerCommand} from '../util';
import {list} from '../..';

registerCommand({
  initialization: true,
  name: 'list',
  description: 'List configured links',
  action ({logger}) {
    return list()
      .then(links => {
        if (!links.length) {
          logger.info('No links found, add some links with `cloud-link add`.');

          return;
        }

        logger.info(links);
      });
  }
});
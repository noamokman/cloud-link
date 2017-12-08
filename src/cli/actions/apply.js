import {registerCommand} from '../util';
import {apply} from '../..';

registerCommand({
  initialization: true,
  name: 'apply',
  description: 'Apply all existing links',
  args: [['[...names]', 'names of links to apply']],
  action ({args: {names = []}, logger}) {
    return apply(...names)
      .then(links => {
        if (!links.length) {
          logger.info('No links applied, add some links with `cloud-link add`.');

          return;
        }

        logger.info(links);
      });
  }
});
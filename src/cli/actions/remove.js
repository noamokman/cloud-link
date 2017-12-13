import {BOOL} from 'caporal';
import {registerCommand} from '../util';
import {remove} from '../..';

registerCommand({
  initialization: true,
  name: 'status',
  description: 'Remove a link',
  args: [['[...names]', 'names of links to show']],
  opts: [['-a, --all', 'remove links from all computers', BOOL, false]],
  action ({args: {names = []}, options: {all}, logger}) {
    return remove(...names.map(name => ({name, all})))
      .then(() => {
        logger.info('Links were removed successfully');
      });
  }
});
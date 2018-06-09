import {BOOL} from 'caporal';
import {registerCommand} from '../util';
import {remove} from '../..';

registerCommand({
  initialization: true,
  name: 'remove',
  alias: 'rm',
  description: 'Remove a link',
  args: [['<name>', 'name of link to remove']],
  opts: [['-a, --all', 'remove link from all computers', BOOL, false]],
  async action ({args: {name}, options: {all}, logger}) {
    await remove({name, all});
    logger.info('Link was removed successfully!');
  }
});
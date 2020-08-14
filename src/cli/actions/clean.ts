import {BOOL} from 'caporal';
import {registerCommand, askConfirmation} from '../util';
import {clean} from '../..';

registerCommand({
  initialization: true,
  name: 'clean',
  description: 'Delete all configured links',
  opts: [['-f, --force', 'force clean', BOOL, false]],
  action: ({logger, options: {force}}) => askConfirmation({
    shouldAsk: !force,
    message: 'Are you sure that you want to delete all configured links?',
    async action () {
      await clean();
      logger.info('Cloud link cleaned successfully!');
    }
  })
});
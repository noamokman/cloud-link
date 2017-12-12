import {BOOL} from 'caporal';
import {askConfirmation, registerCommand} from '../util';
import {clear} from '../..';

registerCommand({
  name: 'clear',
  description: 'Clear the path to cloud folder',
  opts: [['-f, --force', 'force clear', BOOL, false]],
  action ({logger, options: {force}}) {
    return askConfirmation({
      shouldAsk: !force,
      message: 'Are you sure that you want to clear the path to cloud folder?',
      action: () => clear()
        .then(() => {
          logger.info('Cleared successfully!');
        })
    });
  }
});
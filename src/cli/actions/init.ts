import {BOOL} from 'caporal';
import {askConfirmation, registerCommand} from '../util';
import {init, info} from '../..';

registerCommand({
  name: 'init',
  description: 'Set the path to the cloud folder',
  args: [['<path>', 'Cloud folder path']],
  opts: [['-f, --force', 'force overwrite', BOOL, false]],
  action ({args: {path}, options: {force}, logger}) {
    const {cloudPath} = info();

    return askConfirmation({
      shouldAsk: !!(cloudPath && !force),
      message: `Cloud link already initialized in \`${cloudPath}\`.
Do you want to overwrite?`,
      action () {
        init(path);
        logger.info('Cloud link initialized.');
      }
    });
  }
});
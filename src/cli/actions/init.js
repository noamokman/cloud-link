import {registerCommand} from '../util';
import {init} from '../..';

registerCommand({
  name: 'init',
  description: 'Set the path to the cloud folder',
  args: [['<path>', 'Cloud folder path']],
  action ({args: {path}, logger}) {
    logger.info(init(path));
  }
});
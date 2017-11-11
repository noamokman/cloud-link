import {registerCommand} from '../util';
import {clear} from '../..';

registerCommand({
  name: 'clear',
  description: 'Clear path to cloud folder',
  action ({logger}) {
    logger.info(clear());
  }
});
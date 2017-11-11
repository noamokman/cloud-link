import {registerCommand} from '../util';
import {clean} from '../..';

registerCommand({
  initialization: true,
  name: 'clean',
  description: 'Delete all configured links',
  action ({logger}) {
    logger.info(clean());
  }
});
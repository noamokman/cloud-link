import {registerCommand} from '../util';
import {status} from '../..';

registerCommand({
  initialization: true,
  name: 'status',
  description: 'Show the link status of configured links',
  action ({logger}) {
    logger.info(status());
  }
});
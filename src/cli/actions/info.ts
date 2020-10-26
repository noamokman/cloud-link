import {render} from 'prettyjson';
import {registerCommand} from '../util';
import {info} from '../..';

registerCommand({
  initialization: true,
  name: 'info',
  description: 'Print the cloud link configuration',
  action ({logger}) {
    logger.info('Cloud link configuration values:');
    logger.info(render(info()));
  }
});
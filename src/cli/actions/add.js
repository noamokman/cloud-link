import {registerCommand} from '../util';
import {add} from '../..';

registerCommand({
  initialization: true,
  name: 'add',
  description: 'Add a new link',
  action ({logger}) {
    logger.info(add());
  }
});
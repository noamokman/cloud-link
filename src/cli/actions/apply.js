import {registerCommand} from '../util';
import {apply} from '../..';

registerCommand({
  initialization: true,
  name: 'apply',
  description: 'Apply all existing links',
  action ({logger}) {
    logger.info(apply());
  }
});
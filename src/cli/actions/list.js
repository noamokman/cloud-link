import {registerCommand} from '../util';
import {list} from '../..';

registerCommand({
  initialization: true,
  name: 'list',
  description: 'List configured links',
  action ({logger}) {
    return list()
      .then(data => {
        logger.info(data);
      });
  }
});
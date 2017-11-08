import program from 'caporal';
import {notify} from '../util';
import {init} from '../..';

program.command('init', 'Initialize a new computer')
  .argument('<path>', 'Cloud folder path')
  .action(({path}, options, logger) => {
    logger.info(init(path));

    notify();
  });
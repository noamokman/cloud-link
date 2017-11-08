import program from 'caporal';
import {notify} from '../util';
import {apply} from '../..';

program.command('apply', 'Apply all existing links')
  .action((args, options, logger) => {
    logger.info(apply());

    notify();
  });
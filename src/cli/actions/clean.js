import program from 'caporal';
import {notify} from '../util';
import {clean} from '../..';

program.command('clean', 'Delete all configured links')
  .action((args, options, logger) => {
    logger.info(clean());

    notify();
  });
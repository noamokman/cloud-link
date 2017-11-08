import program from 'caporal';
import {notify} from '../util';
import {clear} from '../..';

program.command('clear', 'Clear initialization')
  .action((args, options, logger) => {
    logger.info(clear());

    notify();
  });
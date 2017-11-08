import program from 'caporal';
import {notify} from '../util';
import {add} from '../..';

program.command('add', 'Add a new link')
  .action((args, options, logger) => {
    logger.info(add());

    notify();
  });
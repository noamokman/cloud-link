import program from 'caporal';
import {notify} from '../util';
import {status} from '../..';

program.command('status', 'Show the link status of configured links')
  .action((args, options, logger) => {
    logger.info(status());

    notify();
  });
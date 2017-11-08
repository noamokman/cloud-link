import program from 'caporal';
import {notify} from '../util';
import {initialized} from '../..';

program.command('initialized', 'Check if this computer was initialized')
  .action((args, options, logger) => {
    logger.info(initialized());

    notify();
  });
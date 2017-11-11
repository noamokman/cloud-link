import program from 'caporal';
import {notify} from '../util';
import {info} from '../..';

program.command('info', 'Print the cloud link configuration')
  .action((args, options, logger) => {
    logger.info(info());

    notify();
  });
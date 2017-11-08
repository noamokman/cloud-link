import program from 'caporal';
import pTry from 'p-try';
import {notify} from '../util';
import {list} from '../..';

program.command('list', 'List configured links')
  .action((args, options, logger) => {
    pTry(() => list())
      .then(list => {
        logger.info(list);

        notify();
      })
      .catch(logger.error);
  });
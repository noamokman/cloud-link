import program from 'caporal';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
import {list} from './';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .command('list', 'List configured links')
  .action((args, options, logger) => {
    logger.info(list());

    notifier.notify();
  });

export default argv => {
  program
    .parse(argv);
};
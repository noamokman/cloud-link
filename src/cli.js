import program from 'caporal';
import {version} from '../package.json';
import {list} from './index';

program
  .version(version)
  .command('list', 'List configured links')
  .action((args, options, logger) => {
    logger.info(list());
  });

export default argv => {
  program
    .parse(argv);
};
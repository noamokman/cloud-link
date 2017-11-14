import {BOOL} from 'caporal';
import inquirer from 'inquirer';
import {registerCommand} from '../util';
import {init, info} from '../..';

registerCommand({
  name: 'init',
  description: 'Set the path to the cloud folder',
  args: [['<path>', 'Cloud folder path']],
  opts: [['-f, --force', 'force overwrite', BOOL, false]],
  action ({args: {path}, options: {force}, logger}) {
    const initialize = () => {
      init(path);
      logger.info('Cloud link initialized.');
    };

    const {cloudPath} = info();

    if (!cloudPath || force) {
      return initialize();
    }

    logger.info(`Cloud link already initialized in \`${cloudPath}\`.`);

    return inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'Do you want to overwrite?',
      default: false
    }])
      .then(({overwrite}) => overwrite && initialize());
  }
});
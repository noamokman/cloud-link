import updateNotifier from 'update-notifier';
import PrettyError from 'pretty-error';
import program from 'caporal';
import inquirer from 'inquirer';
import pTry from 'p-try';
import pkg from '../../package.json';
import initialized from '../actions/initialized';

const pe = new PrettyError();

pe.appendStyle({
  'pretty-error > trace > item': {
    marginBottom: 0
  }
});

export const notifier = updateNotifier({pkg});

export const notify = () => notifier.notify();

export const registerCommand = ({name, alias, description, initialization, action, args = [], opts = []}) => {
  const command = program.command(name, description);

  if (alias) {
    command.alias(alias);
  }

  args.forEach(argument => {
    command.argument(...argument);
  });

  opts.forEach(option => {
    command.option(...option);
  });

  command
    .action((args, options, logger) => {
      if (initialization && !initialized()) {
        logger.info('Cloud link not initialized! run `cloud-link init` first');

        return;
      }

      return pTry(() => action({args, options, logger}))
        .then(() => {
          notify();
        })
        .catch(err => {
          console.error(pe.render(err));
        });
    });
};

export const askConfirmation = ({shouldAsk = true, message, action}) => {
  if (!shouldAsk) {
    return action();
  }

  return inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message,
    default: false
  }])
    .then(({confirm}) => confirm && action());
};
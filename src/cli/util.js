import updateNotifier from 'update-notifier';
import PrettyError from 'pretty-error';
import program from 'caporal';
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

export const registerCommand = ({name, description, initialization, action, args = [], opts = []}) => {
  const command = program.command(name, description);

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
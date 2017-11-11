import updateNotifier from 'update-notifier';
import program from 'caporal';
import pTry from 'p-try';
import pkg from '../../package.json';
import initialized from '../actions/initialized';

export const notifier = updateNotifier({pkg});

export const notify = () => notifier.notify();

export const registerCommand = ({name, description, initialization, action, args = []}) => {
  const command = program.command(name, description);

  args.forEach(argument => {
    command.argument(...argument);
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
        .catch(console.error);
    });
};
import updateNotifier from 'update-notifier';
import PrettyError from 'pretty-error';
import program from 'caporal';
import inquirer from 'inquirer';
import pkg from '../../package.json';
import initialized from '../actions/initialized';

const pe = new PrettyError();

pe.appendStyle({
  'pretty-error > trace > item': {
    marginBottom: 0
  }
});

const notifier = updateNotifier({pkg});

export const registerCommand = ({
  name,
  alias,
  description,
  initialization,
  action,
  args = [],
  opts = []
}: {
  name: string;
  alias?: string;
  description: string;
  initialization?: boolean;
  action: (params: {args: Record<string, any>; options: Record<string, any>; logger: Logger}) => void | Promise<void>;
  args?: Parameters<Command['argument']>[];
  opts?: Parameters<Command['option']>[];
}) => {
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
    .action(async (args, options, logger) => {
      if (initialization && !initialized()) {
        logger.info('Cloud link not initialized! run `cloud-link init` first');

        return;
      }

      try {
        await action({args, options, logger});

        notifier.notify();
      }
      catch (error) {
        console.error(pe.render(error));
      }
    });
};

export const askConfirmation = async ({shouldAsk = true, message, action}: {shouldAsk: boolean; message: string; action: () => void | Promise<void>}) => {
  if (!shouldAsk) {
    return action();
  }

  const {confirm} = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message,
    default: false
  }]);

  return confirm && action();
};
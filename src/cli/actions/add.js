import {registerCommand} from '../util';
import {add} from '../..';

registerCommand({
  initialization: true,
  name: 'add',
  description: 'Add a new link',
  args: [['<name>', 'name of the link']],
  opts: [['-s, --src', 'link source'], ['-d, --dest', 'link destination']],
  action ({args: {name}, options: {src, dest}, logger}) {
    return add({name, src, dest})
      .then(() => {
        logger.info();
      });
  }
});
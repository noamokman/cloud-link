import {registerCommand} from '../util';
import {initialized} from '../..';

registerCommand({
  name: 'initialized',
  description: 'Check if this computer was initialized',
  action ({logger}) {
    logger.info(initialized() ?
      'Yes, this computer has been initialized, for more info run `cloud-link info`.' :
      'No, this computer has not been initialized. Run `cloud-link init`.');
  }
});
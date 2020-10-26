import program from 'caporal';
import {version, description} from '../../package.json';

import './actions/add';
import './actions/apply';
import './actions/clean';
import './actions/clear';
import './actions/info';
import './actions/init';
import './actions/initialized';
import './actions/list';
import './actions/remove';
import './actions/status';

program.version(version)
  .description(description);

export default (argv: string[]) => {
  program
    .parse(argv);
};
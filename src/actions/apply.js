import {hostname} from 'os';
import _ from 'lodash';
import lnfs from 'lnfs';
import {stat} from 'fs';
import pify from 'pify';
import {get} from '../config-file';

const statP = pify(stat);

export default () => get()
  .then(({links}) => Promise.all(_.values(links)
    .filter(({dest}) => dest[hostname()])
    .map(({src, dest}) => statP(src)
      .then(stats => stats.isDirectory() ? 'junction' : 'file')
      .then(type => lnfs(src, dest, type)))));
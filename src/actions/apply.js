import {hostname} from 'os';
import lnfs from 'lnfs';
import {stat} from 'fs';
import pify from 'pify';
import {get} from '../config-file';

const statP = pify(stat);

export default () => get()
  .then(({links}) => Promise.all(Object.keys(links)
    .map(name => ({...links[name], name, dest: links[name].dest[hostname()]}))
    .filter(({dest}) => dest)
    .map(({src, dest, name}) => statP(src)
      .then(stats => stats.isDirectory() ? 'junction' : 'file')
      .then(type => lnfs(src, dest, type))
      .then(() => ({name, src, dest, status: 'linked'}))
      .catch(error => ({name, src, dest, error, status: error.code !== 'ENOENT' ? 'error' : 'missing'})))));
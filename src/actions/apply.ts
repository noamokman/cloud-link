import {stat} from 'fs';
import {hostname} from 'os';
import {resolve} from 'path';
import lnfs from 'lnfs';
import pify from 'pify';
import store from '../store';
import list from './list';

const statP = pify(stat);

export default (...names) => list()
  .then(links => {
    const applyLinks = names.length ? links.filter(({name}) => names.includes(name)) : links;

    return Promise.all(applyLinks
      .map(link => ({...link, src: resolve(store.get('cloudPath'), link.src), dest: link.dest[hostname()]}))
      .filter(({dest}) => dest)
      .map(({src, dest, name}) => statP(src)
        .then(stats => stats.isDirectory() ? 'junction' : 'file')
        .then(type => lnfs(src, dest, type))
        .then(() => ({name, src, dest, status: 'linked'}))
        .catch(error => ({name, src, dest, error, status: error.code !== 'ENOENT' ? 'error' : 'missing'}))));
  });
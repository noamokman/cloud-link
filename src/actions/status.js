import {hostname} from 'os';
import {resolve} from 'path';
import fs from 'fs';
import pify from 'pify';
import pCatchIf from 'p-catch-if';
import _ from 'lodash';
import store from '../store';
import list from './list';

const {lstat, realpath} = pify(fs);

export default (...names) => list()
  .then(links => {
    const statusLinks = names.length ? links.filter(({name}) => names.includes(name)) : links;

    return Promise.all(statusLinks.map(({dest, src, name}) => {
      const resolvedSrc = resolve(store.get('cloudPath'), src);
      const resolvedDest = resolve(dest[hostname()]);

      return lstat(resolvedDest)
        .then(stats => {
          if (!stats.isSymbolicLink()) {
            return 'unlinked';
          }

          return realpath(resolvedDest)
            .then(res => res !== resolvedSrc ? 'wrong' : 'linked');
        })
        .catch(pCatchIf(err => err.code === 'ENOENT', _.constant('missing')))
        .then(status => ({status, src: resolvedSrc, dest: resolvedDest, name}));
    }));
  });

import list from './list';
import {hostname} from 'os';
import {resolve} from 'path';
import fs from 'fs';
import pify from 'pify';
import pCatchIf from 'p-catch-if';

const {lstat, realpath} = pify(fs);

export default () => list()
  .then(links => Promise.all(links.map(({dest, src, name}) => {
    const resolvedSrc = resolve(src);
    const resolvedDest = resolve(dest[hostname()]);

    return lstat(resolvedDest)
      .then(stats => {
        if (!stats.isSymbolicLink()) {
          return 'unlinked';
        }

        return realpath(resolvedDest)
          .then(res => res !== resolvedSrc ? 'wrong' : 'linked');
      })
      .catch(pCatchIf(err => err.code === 'ENOENT', () => 'missing'))
      .then(status => ({status, src: resolvedSrc, dest: resolvedDest, name}));
  })));

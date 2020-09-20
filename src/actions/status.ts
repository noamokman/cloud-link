import {hostname} from 'os';
import {resolve} from 'path';
import {promises} from 'fs';
import store from '../store';
import {LinkReport, LinkStatus} from '../types';
import list from './list';

const {lstat, realpath} = promises;

const getLinkStatus = async ({src, dest}: {src: string; dest: string}): Promise<LinkStatus> => {
  try {
    const stats = await lstat(dest);

    if (!stats.isSymbolicLink()) {
      return 'unlinked';
    }

    const res = await realpath(dest);

    return res !== src ? 'wrong' : 'linked';
  }

  catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }

    return 'missing';
  }
};

export default async (...names: string[]): Promise<LinkReport[]> => {
  const links = await list();
  const statusLinks = names.length ? links.filter(({name}) => names.includes(name)) : links;
  const localLinks = statusLinks.filter(({dest}) => dest[hostname()]);
  const cloudPath = store.get('cloudPath');

  return Promise.all(localLinks.map(async ({dest, src, name}) => {
    const resolvedSrc = resolve(cloudPath, src);
    const resolvedDest = resolve(dest[hostname()]);
    const status = await getLinkStatus({
      src: resolvedSrc,
      dest: resolvedDest
    });

    return {status, src: resolvedSrc, dest: resolvedDest, name};
  }));
};

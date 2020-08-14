import {promises} from 'fs';
import {hostname} from 'os';
import {resolve} from 'path';
import * as lnfs from 'lnfs';
import store from '../store';
import list from './list';

const {stat} = promises;

const applyLink = async ({name, src, dest}: {name: string; src: string; dest: string}) => {
  try {
    const stats = await stat(src);

    await lnfs(src, dest, stats.isDirectory() ? 'junction' : 'file');

    return {name, src, dest, status: 'linked'};
  }
  catch (error) {
    return {name, src, dest, error, status: error.code !== 'ENOENT' ? 'error' : 'missing'};
  }
};

export default async (...names: string[]) => {
  const links = await list();
  const applyLinks = names.length ? links.filter(({name}) => names.includes(name)) : links;

  return Promise.all(applyLinks
    .map(link => ({...link, src: resolve(store.get('cloudPath'), link.src), dest: link.dest[hostname()]}))
    .filter(({dest}) => dest)
    .map(applyLink));
};
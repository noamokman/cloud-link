import {promises} from 'fs';
import {hostname} from 'os';
import {resolve} from 'path';
import lnfs from 'lnfs';
import store from '../store';
import type {LinkApplyResult, LinkInstance} from '../types';
import list from './list';

const {stat} = promises;

const applyLink = async ({name, src, dest}: LinkInstance): Promise<LinkApplyResult> => {
  try {
    const stats = await stat(src);

    await lnfs(src, dest, stats.isDirectory() ? 'junction' : 'file');

    return {name, src, dest, status: 'linked'};
  }
  catch (error) {
    return {name, src, dest, error, status: error.code !== 'ENOENT' ? 'error' : 'missing'};
  }
};

export default async (...names: string[]): Promise<LinkApplyResult[]> => {
  const links = await list();
  const applyLinks = names.length ? links.filter(({name}) => names.includes(name)) : links;

  return Promise.all(applyLinks
    .map(({src, dest, name}) => ({
      name,
      src: resolve(store.get('cloudPath'), src),
      dest: dest[hostname()]
    }))
    .filter(({dest}) => dest)
    .map(applyLink));
};
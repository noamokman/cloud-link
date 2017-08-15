import {hostname} from 'os';
import {resolve} from 'path';
import _ from 'lodash';
import fs from 'fs';
import pify from 'pify';
import lnfs from 'lnfs';
import {get, set, clean as deleteConfig} from './config-file';
import store from './store';
import CloudLinkError from './cloud-link-error';

const fsP = pify(fs);

export function initialized () {
  return store.has('cloudPath');
}

const ensureInitialization = () => {
  if (initialized()) {
    return;
  }

  throw new CloudLinkError('Cloud link not initialized');
};

export function init (path) {
  store.set('cloudPath', path);
}

export function clear () {
  store.delete('cloudPath');
}

export function list () {
  ensureInitialization();

  return get()
    .then(({links}) => Object.keys(links).map(name => {
      const link = links[name];

      return {name, ...link};
    }));
}

export function status () {
  return list()
    .then(links => Promise.all(links.map(({dest, src, name}) => {
      const resolvedSrc = resolve(src);
      const resolvedDest = resolve(dest[hostname()]);

      return fsP.lstat(resolvedDest)
        .then(stats => {
          if (!stats.isSymbolicLink()) {
            return 'not-linked';
          }

          return fsP.realpath(resolvedDest)
            .then(res => res !== resolvedSrc ? 'wrong' : 'ok');
        })
        .catch(err => err.code === 'ENOENT' ? 'missing' : Promise.resolve(err))
        .then(status => ({status, src: resolvedSrc, dest: resolvedDest, name}));
    })));
}

export function add ({name, src, dest} = {}) {
  if (typeof name !== 'string' || typeof src !== 'string' || typeof dest !== 'string') {
    throw new TypeError('name, src and dest must be of type string');
  }

  ensureInitialization();

  return get()
    .then(data => {
      const {links} = data;

      links[name] = {src, dest: {[hostname()]: dest}};

      return set(data);
    });
}

export function link ({name, dest}) {
  ensureInitialization();

  return get()
    .then(data => {
      const {links} = data;

      links[name].dest[hostname()] = dest;

      return set(data);
    });
}

export function apply () {
  ensureInitialization();

  return get()
    .then(({links}) => Promise.all(_.values(links)
      .filter(({dest}) => dest[hostname()])
      .map(({src, dest}) => fsP.stat(src)
        .then(stats => stats.isDirectory() ? 'junction' : 'file')
        .then(type => lnfs(src, dest, type)))));
}


export function clean () {
  return deleteConfig();
}
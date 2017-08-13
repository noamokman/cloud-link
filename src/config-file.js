import {join} from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import pify from 'pify';
import store from './store';
const jf = pify(jsonfile);
const fsP = pify(fs);

export const defaultConfigName = '.cloud-link.json';

export const getPath = () => join(store.get('cloudPath'), defaultConfigName);

export const get = () => jf.readFile(getPath())
  .catch(err => err.code !== 'ENOENT' ? Promise.reject(err) : {links: {}});

export const set = data => jf.writeFile(getPath(), data);

export const clean = () => fsP.unlink(getPath());
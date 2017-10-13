import {join} from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import pify from 'pify';
import store from './store';
import CloudLinkError from './cloud-link-error';
import initialized from './actions/initialized';
import _ from 'lodash';

const jf = pify(jsonfile);
const fsP = pify(fs);

export const defaultConfigName = '.cloud-link.json';
export const defaultTemplate = {links: {}};

export const getPath = () => {
  if (!initialized()) {
    throw new CloudLinkError('Cloud link not initialized');
  }

  return join(store.get('cloudPath'), defaultConfigName);
};

export const get = () => jf.readFile(getPath())
  .catch(err => err.code !== 'ENOENT' ? Promise.reject(err) : _.cloneDeep(defaultTemplate));

export const set = data => jf.writeFile(getPath(), data);

export const clean = () => fsP.unlink(getPath());
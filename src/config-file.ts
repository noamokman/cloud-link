import {join} from 'path';
import {promises
} from 'fs';
import {cloneDeep} from 'lodash';
import loadJsonFile from 'load-json-file';
import writeJsonFile from 'write-json-file';
import store from './store';
import CloudLinkError from './cloud-link-error';
import initialized from './actions/initialized';
import {Config} from './types';

const {unlink} = promises;

export const defaultConfigName = '.cloud-link.json';
export const defaultTemplate: Config = {links: {}};

export const getPath = () => {
  if (!initialized()) {
    throw new CloudLinkError('Cloud link not initialized');
  }

  return join(store.get('cloudPath'), defaultConfigName);
};

export const get = async (): Promise<Config> => {
  try {
    return await loadJsonFile(getPath());
  }
  catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }

    return cloneDeep(defaultTemplate);
  }
};

export const set = (config: Config) => writeJsonFile(getPath(), config);

export const clean = () => unlink(getPath());
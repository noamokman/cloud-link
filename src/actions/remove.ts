import {hostname} from 'os';
import _ from 'lodash';
import {get, set} from '../config-file';
import CloudLinkError from '../cloud-link-error';

export default async (...links: {name: string; all?: boolean}[]) => {
  const badLink = links.find(({name, all = false}) => typeof name !== 'string' || typeof all !== 'boolean');

  if (badLink || !links.length) {
    throw new TypeError('name must be of type string and all must be of type boolean');
  }

  const config = await get();

  const mergedLinks = links.reduce((links, {name, all}) => {
    if (!links[name]) {
      throw new CloudLinkError(`Trying to remove link named '${name}' but none were found.`);
    }

    if (all) {
      delete links[name];

      return {...links};
    }

    delete links[name].dest[hostname()];

    if (_.isEmpty(links[name].dest)) {
      delete links[name];
    }

    return links;
  }, config.links);

  return set({...config, links: mergedLinks});
};

import {hostname} from 'os';
import {resolve} from 'path';
import {get, set} from '../config-file';
import CloudLinkError from '../cloud-link-error';

export default async (...links: {name: string; src: string; dest: string}[]) => {
  const badLink = links.find(({name, src, dest}) => typeof name !== 'string' || typeof src !== 'string' || typeof dest !== 'string');

  if (badLink || !links.length) {
    throw new TypeError('name, src and dest must be of type string');
  }

  const config = await get();

  const mergedLinks = links.reduce((links, {name, src, dest}) => {
    const link = links[name] || {src, dest: {}};

    if (link.src !== src) {
      throw new CloudLinkError('Trying to add conflicting links. try to remove the link first.');
    }

    link.dest[hostname()] = resolve(dest);

    return {...links, [name]: link};
  }, config.links);

  return set({...config, links: mergedLinks});
};

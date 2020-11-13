import {get} from '../config-file';
import type {Link} from '../types';

export default async (): Promise<Link[]> => {
  const {links} = await get();

  return Object.entries(links).map(([name, linkRecord]) => ({name, ...linkRecord}));
};

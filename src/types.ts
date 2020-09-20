export interface LinkRecord {
  src: string;
  dest: Record<string, string>;
}

export interface Link extends LinkRecord {
  name: string;
}

export interface LinkInstance {
  name: string;
  src: string;
  dest: string;
}

export interface LinkReport extends LinkInstance{
  status: LinkStatus;
}

export interface LinkApplyResult extends LinkInstance {
  status: 'linked' | 'error' | 'missing';
  error?: Error;
}

export type LinkStatus = 'unlinked' | 'linked' | 'missing' | 'wrong';

export interface Config {
  links: Record<string, LinkRecord>;
}
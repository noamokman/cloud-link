export interface LinkRecord {
  src: string;
  dest: Record<string, string>;
}

export interface Link extends LinkRecord {
  name: string;
}

export type LinkStatus = 'unlinked' | 'linked' | 'missing' | 'wrong';

export interface Config {
  links: Record<string, LinkRecord>;
}
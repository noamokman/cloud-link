export interface Link {
  name: string;
}

export interface Config {
  links: Record<string, {
    src: string;
    dest: Record<string, string>;
  }>;
}
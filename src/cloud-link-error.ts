import NestedError from 'nested-error-stacks';

export default class CloudLinkError extends NestedError {
  constructor (message: string, nested?: Error) {
    super(message, nested);
    Object.assign(this, nested);
    this.name = 'CloudLinkError';
  }
}
import NestedError from 'nested-error-stacks';

export default class CloudLinkError extends NestedError {
  constructor (message, nested) {
    super(message, nested);
    Object.assign(this, nested);
    this.name = 'CloudLinkError';
  }
}
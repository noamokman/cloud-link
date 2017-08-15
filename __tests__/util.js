import {clear, init} from '../src';

export const shouldThrowIfNotInitilized = fn => {
  it('should throw if not initialized', () => {
    clear();
    expect(fn).toThrow('Cloud link not initialized');
    init('.');
  });
};
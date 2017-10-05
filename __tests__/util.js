import mock from 'mock-fs';
import init from '../src/actions/init';
import clear from '../src/actions/clear';

export function shouldThrowIfNotInitilized (fn) {
  it('should throw if not initialized', () => {
    expect(fn).toThrow('Cloud link not initialized');
  });
}

export function wrapInitialization (uninitilized, initilized) {
  describe('uninitilized', () => {
    shouldThrowIfNotInitilized(uninitilized);
  });

  describe('initilized', () => {
    beforeAll(() => {
      init('.');
    });

    afterAll(() => {
      clear();
    });

    initilized();
  });
}

export function mockFs (config) {
  beforeAll(() => {
    mock(config);
  });
  afterAll(() => {
    mock.restore();
  });
}
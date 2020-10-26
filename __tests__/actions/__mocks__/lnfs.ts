const lnfs = jest.genMockFromModule('lnfs');

export interface LnfsMock {
  predicate: (...args: any) => boolean;
  value: () => any;
}

let mocks: LnfsMock = [];

export default (...args) => {
  const found = mocks.find(({predicate}) => predicate(...args));

  return found ? found.value() : lnfs(...args);
};

export const _registerMock = mock => {
  mocks.push(mock);
};

export const _clearMocks = () => {
  mocks = [];
};
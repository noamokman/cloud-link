const lnfs = jest.genMockFromModule('lnfs');

let mocks = [];

const mock = (...args) => {
  const found = mocks.find(({predicate}) => predicate(...args));

  return found ? found.value() : lnfs(...args);
};

mock._registerMock = mock => {
  mocks.push(mock);
};

mock._clearMocks = () => {
  mocks = [];
};

module.exports = mock;
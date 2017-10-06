const lnfs = jest.genMockFromModule('lnfs');

let mocks = [];

const mock = function (...args) {
  const found = mocks.find(({predicate}) => predicate(...args));

  if (found) {
    return found.value;
  }

  return lnfs(...args);
};

mock._registerMock = mock => {
  mocks.push(mock);
};

mock._clearMocks = () => {
  mocks = [];
};

module.exports = mock;
process.chdir('/');

const memfs = require('memfs');

const originalLstat = memfs.promises.lstat;

memfs.promises.lstat = (...args) => {
  if (args[0].includes('error')) {
    throw new Error('error');
  }

  return originalLstat(...args);
};

module.exports = memfs;
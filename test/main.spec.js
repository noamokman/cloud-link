import {expect} from 'chai';

describe('cloud-link', () => {
  const cloudLink = require('../src');

  describe('exports', () => {
    it('should expose a list function', () => {
      expect(cloudLink.list).to.be.a('function');
    });
  });

  describe('list', () => {
    it('should return an array', () => {
      expect(cloudLink.list()).to.be.an('array');
    });
  });
});
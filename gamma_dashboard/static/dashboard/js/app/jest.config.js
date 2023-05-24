const path = require('path');

module.exports = {
  moduleNameMapper: {
      '\\.svg': path.resolve(__dirname, 'jest/svgMock.js'),
      '\\.(css|scss)$': 'identity-obj-proxy',
  },
};

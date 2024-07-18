// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false, // No polyfill for fs
      path: require.resolve('path-browserify'), // Polyfill for path
    },
  },
};

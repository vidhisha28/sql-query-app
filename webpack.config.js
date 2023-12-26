const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false, // or require.resolve("path-browserify")
      path: require.resolve('path-browserify'),
    },
  },
};

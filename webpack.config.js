const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',                
        },
        
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        
      },
    ],
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "path": require.resolve("path-browserify"),
      "fs": false,
    }
  },
  output: {
    path: path.resolve(__dirname, './src/vendor'),
    filename: 'bundle.min.js'
  }

};

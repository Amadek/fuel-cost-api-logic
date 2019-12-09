const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'js/[name].js',
    publicPath: '/assets/',
    library: 'ui',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

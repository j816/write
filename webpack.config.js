const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: './src/renderer/index.ts',
  target: 'electron-renderer',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/renderer'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: true,
                module: 'esnext'
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      path: false,
      fs: false
    }
  },
  devtool: 'source-map',
  optimization: {
    minimize: false
  }
}; 
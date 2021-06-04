const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
      main: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Users list',
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
        // JavaScript
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },  
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
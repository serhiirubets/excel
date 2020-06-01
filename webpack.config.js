const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const getFileName = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const getJsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];

  if (isDev) {
    loaders.push({
      loader: 'eslint-loader',
    });
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 4040,
    hot: isDev,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhiteSpace: isProd,
      },
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: getJsLoaders(),
      },
    ],
  },
};

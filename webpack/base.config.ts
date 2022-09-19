import { Configuration, ProvidePlugin } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const configuration: Configuration = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    publicPath: '/dataset-catalogs/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: { path: require.resolve('path-browserify') },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '..', 'babel.config.js'),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '..', 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
        include: [resolve(__dirname, '..', 'src', 'images')],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: [resolve(__dirname, '..', 'src', 'images')],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      base: '/dataset-catalogs/',
      chunks: ['main'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/authentication/silent-check-sso.html', to: './' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.css',
    }),
    new ProvidePlugin({
      process: 'process',
    }),
  ],
};

export default configuration;

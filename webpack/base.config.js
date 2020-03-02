import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BaseHrefWebpackPlugin } from 'base-href-webpack-plugin';

export default {
  entry: {
    main: './src/index.jsx',
    maintenance: './src/entrypoints/maintenance/index.tsx'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: ['ts-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new (class ChunksFromEntryPlugin {
      apply(compiler) {
        compiler.hooks.emit.tap('ChunksFromEntryPlugin', compilation => {
          compilation.hooks.htmlWebpackPluginAlterChunks.tap(
            'ChunksFromEntryPlugin',
            (_, { plugin }) =>
              compilation.entrypoints
                .get(plugin.options.entry)
                .chunks.map(chunk => ({
                  names: chunk.name ? [chunk.name] : [],
                  files: chunk.files.slice(),
                  size: chunk.modulesSize(),
                  hash: chunk.hash
                }))
          );
        });
      }
    })(),
    new HtmlWebpackPlugin({
      entry: 'main',
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/img/favicon.ico',
      inject: true
    }),
    new HtmlWebpackPlugin({
      entry: 'maintenance',
      template: './src/entrypoints/maintenance/index.html',
      filename: 'maintenance.html',
      favicon: './src/img/favicon.ico',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.css'
    }),
    new CopyWebpackPlugin(
      [{ from: './src/img/*', to: './img', flatten: true }],
      {
        copyUnmodified: true
      }
    ),
    new CopyWebpackPlugin(
      [{ from: './src/lib/auth/silent-check-sso.html', to: './' }],
      {
        copyUnmodified: true
      }
    ),
    new BaseHrefWebpackPlugin({
      baseHref: '/'
    })
  ]
};

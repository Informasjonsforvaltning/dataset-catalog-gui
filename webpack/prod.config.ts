import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';

import baseConfig from './base.config';

const configuration: Configuration = merge(baseConfig, {
  mode: 'production',
  target: ['web', 'es5'],
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      maxSize: 40000,
      cacheGroups: {
        mainVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: module =>
            `main.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'main'
        },
        authVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: module =>
            `auth.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'auth'
        }
      }
    }
  }
});

export default configuration;

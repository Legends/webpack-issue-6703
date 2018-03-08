const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = function (env) {
  const isDist = env.node_env === 'production';
  return {
    context: path.resolve(__dirname, './src'),
    devtool: false,
    entry: {
      bundle: path.resolve(__dirname, './src/entry.js')
    },
    mode: isDist ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-0'],
              plugins: [
                [
                  'babel-root-import',
                  {
                    'rootPathSuffix': 'src/'
                  }
                ],
                'react-html-attrs',
                'transform-class-properties',
                'transform-decorators-legacy'
              ]
            }
          }]
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  url: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [
                    path.resolve(__dirname, './node_modules/compass-mixins/lib')
                  ]
                }
              },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    path.resolve(__dirname, './src/styles/vars.scss')
                  ]
                }
              }
            ]
          })
        }
      ]
    },
    optimization: {
      minimize: isDist,
      removeEmptyChunks: true,
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          bundle: {
            chunks: 'initial',
            name: 'bundle',
            priority: -20,
            reuseExistingChunk: true
          },
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            priority: -10,
            test: /node_modules\/(.*)\.js/
          }
        }
      }
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/'
    },
    plugins: [
      new Webpack.optimize.OccurrenceOrderPlugin(),
      new Webpack.optimize.ModuleConcatenationPlugin(),
      new Webpack.HashedModuleIdsPlugin(),
      new ExtractTextPlugin('[name].css')
    ]
  }
};
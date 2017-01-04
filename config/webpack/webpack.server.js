var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');
var helpers = require('../helpers');


module.exports = function(options) {

  const ENV = process.env.ENV = process.env.NODE_ENV = options.env === 'dev' ? 'development' :
    options.env === 'prod' ? 'production' : 'test';
  const METADATA = {
    ENV: ENV,
  };

  return {
    entry: {
      'server': './server/server.ts',
    }, 

    output: {
      path: helpers.root('dist'),
      filename: 'index.js'
    },

    target: 'node',
    externals: [nodeExternals()],

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },

    resolve: {
      extensions: ['.ts', '.js']
    },

    plugins: options.env === 'dev' ? [
      // Dev Plugins
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      }),
      new WebpackShellPlugin({
        onBuildEnd:['node dist']
      })
    ] : options.env === 'test' ? [
      // Test Plugins
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      })
    ] : options.env === 'prod' ? [
      // Prod Plugins
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          keep_fnames: true
        }
      })
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          keep_fnames: true
        }
      }),
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      })
    ]
  };
}
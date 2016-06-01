import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import {map} from 'lodash'

const localModules = path.resolve(path.join(__dirname, '../../node_modules'))

function prefixModule (prefix) {
  return (name) => {
    return path.join(localModules, `${prefix}-${name}`)
  }
}

export default function build (entry, bundle, options) {
  const resolvers = {
    fallback: localModules
  }

  const entries = {
    all: [
      'babel-polyfill',
      entry
    ],
    development: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server'
    ]
  }

  const plugins = {
    default: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    development: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }

  const loaders = {
    all: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: map([
            'transform-runtime'
          ], prefixModule('babel-plugin')),
          presets: map([
            'es2015',
            'stage-0',
            'react'
          ], prefixModule('babel-preset'))
        }
      }
    ],
    development: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot'
      }
    ]
  }

  const compiler = webpack({
    entry: options.dev ? entries.development.concat(entries.all) : entries.all,
    plugins: options.dev ? plugins.development : plugins.default,
    devtool: 'source-map',
    output: {
      path: path.dirname(path.resolve(bundle)),
      filename: path.basename(bundle)
    },
    module: {
      loaders: options.dev ? loaders.development.concat(loaders.all) : loaders.all
    },
    resolve: resolvers,
    resolveLoader: resolvers
  })

  if (options.dev) {
    const server = new WebpackDevServer(compiler, {
      contentBase: options.base || './',
      hot: true
    })
    server.listen(8080)
  } else {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err)
        process.exit(1)
      } else {
        console.info(stats.toString({
          colors: true,
          errorDetails: true
        }))
      }
    })
  }
}

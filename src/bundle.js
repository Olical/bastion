import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import configPassthrough from './config/passthrough'
import babelConfig from './config/babel'
import standardConfig from './config/standard'
import log from './log'
import {
  isString,
  isEmpty
} from 'lodash'

export default async function bundle (options) {
  log.verbose('entry: %s', options.entry)
  log.verbose('bundle: %s', options.bundle)

  const bastionModules = path.resolve(path.join(__dirname, '../node_modules'))

  const baseBundleConfig = {
    entry: [
      options.entry
    ],
    output: {
      path: path.dirname(path.resolve(options.bundle)),
      filename: path.basename(options.bundle)
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'standard'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: await babelConfig()
        }
      ]
    },
    resolve: {
      fallback: bastionModules,
      extensions: ['', '.js']
    },
    resolveLoader: {
      fallback: bastionModules
    },
    standard: await standardConfig()
  }

  if (options.dev) {
    log.debug('applying dev config mutations')

    baseBundleConfig.devtool = 'source-map'

    baseBundleConfig.entry.unshift(
      `webpack-dev-server/client?http://localhost:${options.port}/`,
      'webpack/hot/only-dev-server'
    )

    baseBundleConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  } else {
    baseBundleConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ]
  }

  const base = isString(options.dev) ? options.dev : path.dirname(options.bundle)
  const bundleConfig = await configPassthrough('webpack', baseBundleConfig, options)
  const compiler = webpack(bundleConfig)

  if (options.dev) {
    const server = new WebpackDevServer(compiler, {
      contentBase: base,
      hot: true,
      stats: {
        colors: true,
        errorDetails: true
      }
    })

    server.listen(options.port)
  } else {
    compiler.run((err, stats) => {
      if (err) {
        log.error(err)
        process.exit(1)
      } else {
        log.info(stats.toString({
          colors: true,
          errorDetails: true
        }))

        if (!isEmpty(stats.compilation.warnings)) {
          process.exit(1)
        }
      }
    })
  }
}

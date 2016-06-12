import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import configPassthrough from '../configPassthrough'
import babelConfig from '../babelConfig'
import log from '../log'

const defaultEntry = './src/index.js'
const defaultBundle = './dist/bundle.js'

export default function build (entry = defaultEntry, bundle = defaultBundle, options) {
  log.verbose('entry: %s', entry)
  log.verbose('bundle: %s', bundle)

  const resolvers = {
    fallback: path.resolve(path.join(__dirname, '../../node_modules'))
  }

  const baseBundleConfig = {
    entry: [
      entry
    ],
    devtool: 'source-map',
    output: {
      path: path.dirname(path.resolve(bundle)),
      filename: path.basename(bundle)
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: babelConfig()
        }
      ]
    },
    resolve: resolvers,
    resolveLoader: resolvers
  }

  if (options.dev) {
    log.debug('applying dev config mutations')

    baseBundleConfig.serverPort = 8080

    baseBundleConfig.entry.unshift(
      'webpack-dev-server/client?http://localhost:8080/'
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
      })
    ]
  }

  const bundleConfig = configPassthrough('webpack', baseBundleConfig, options)
  const compiler = webpack(bundleConfig)

  if (options.dev) {
    const server = new WebpackDevServer(compiler, {
      contentBase: options.base || path.dirname(bundle)
    })

    server.listen(bundleConfig.serverPort)
  } else {
    compiler.run((err, stats) => {
      if (err) {
        log.error(err)
        process.exit(1)
      } else {
        log.verbose(stats.toString({
          colors: true,
          errorDetails: true
        }))
      }
    })
  }
}

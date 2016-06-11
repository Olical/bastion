import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import configPassthrough from '../configPassthrough'
import babelConfig from '../babelConfig'

export default function build (entry, bundle, options) {
  const resolvers = {
    fallback: path.resolve(path.join(__dirname, '../../node_modules'))
  }

  const baseBundleConfig = {
    options,
    entry: [
      'babel-polyfill',
      entry
    ],
    plugins: [
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
    baseBundleConfig.serverPort = 8080

    baseBundleConfig.entry.unshift(
      'webpack-dev-server/client?http://localhost:8080/'
    )

    baseBundleConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    )
  }

  const bundleConfig = configPassthrough('webpack', baseBundleConfig)
  const compiler = webpack(bundleConfig)

  if (options.dev) {
    const server = new WebpackDevServer(compiler, {
      contentBase: options.base || path.dirname(bundle)
    })

    server.listen(bundleConfig.serverPort)
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

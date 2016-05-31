import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

export default function build (source, destination, options) {
  const entries = {
    all: [
      'babel-polyfill',
      source
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
          plugins: [
            'transform-runtime'
          ],
          presets: [
            'es2015',
            'stage-0',
            'react'
          ]
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
      path: path.dirname(path.resolve(destination)),
      filename: path.basename(destination)
    },
    module: {
      loaders: options.dev ? loaders.development.concat(loaders.all) : loaders.all
    }
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
      } else {
        console.info(stats.toString({
          colors: true,
          errorDetails: true
        }))
      }
    })
  }
}

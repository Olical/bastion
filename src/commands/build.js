import webpack from 'webpack'
import path from 'path'

export default function build (source, destination) {
  webpack({
    entry: [
      'babel-polyfill',
      source
    ],
    devtool: 'source-map',
    output: {
      path: path.dirname(destination),
      filename: path.basename(destination)
    },
    module: {
      loaders: [
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
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        }
      })
    ]
  }, (err, stats) => {
    if (err) {
      console.error(err)
    } else {
      console.info(stats.toString({
        colors: true
      }))
    }
  })
}

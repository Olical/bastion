import webpack from 'webpack'
import path from 'path'
import WebpackDevServer from 'webpack-dev-server'

export default function serve (source, destination) {
  const compiler = webpack({
    entry: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
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
          loaders: [
            {
              loader: 'react-hot'
            },
            {
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
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })

  const server = new WebpackDevServer(compiler)

  server.listen(8080)
}

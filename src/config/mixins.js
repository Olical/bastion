import {last} from 'lodash'

export default function mixins (config, options) {
  return {
    webpack: {
      react () {
        if (options.dev) {
          config.module.loaders.unshift({
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'react-hot'
          })
        }
      },
      elm () {
        config.module.loaders.push({
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loaders: ['elm-webpack']
        })

        config.resolve.extensions.push('.elm')

        if (options.dev) {
          last(config.module.loaders).loaders.unshift('elm-hot')
        }
      }
    }
  }
}

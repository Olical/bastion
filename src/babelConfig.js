import path from 'path'
import {map} from 'lodash'
import configPassthrough from './configPassthrough'

const localModules = path.resolve(path.join(__dirname, '../node_modules'))

function prefixModule (prefix) {
  return (name) => {
    return path.join(localModules, `${prefix}-${name}`)
  }
}

export default function babelConfig (skipConfigPassthrough) {
  const config = {
    plugins: map([
      'transform-runtime'
    ], prefixModule('babel-plugin')),
    presets: map([
      'es2015',
      'stage-0',
      'react'
    ], prefixModule('babel-preset'))
  }

  if (skipConfigPassthrough) {
    return config
  } else {
    return configPassthrough('babel', config)
  }
}

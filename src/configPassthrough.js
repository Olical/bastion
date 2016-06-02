import fs from 'fs'
import * as babel from 'babel-core'
import _eval from 'eval'
import babelConfig from './babelConfig'

const configFile = 'bastion.conf.js'

export default function configPassthrough (name, config) {
  if (fileExists(configFile)) {
    const source = babel.transformFileSync(configFile, babelConfig(true)).code
    const fns = _eval(source, true)

    if (typeof fns[name] === 'function') {
      return fns[name](config)
    }
  }

  return config
}

function fileExists (path) {
  const stat = fs.statSync(path)
  return stat.isFile()
}

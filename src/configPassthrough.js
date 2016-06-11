import fs from 'fs'
import * as babel from 'babel-core'
import _eval from 'eval'
import babelConfig from './babelConfig'
import log from './log'

const configFile = 'bastion.conf.js'

export default function configPassthrough (name, config) {
  if (fileExists(configFile)) {
    log.verbose('found config file')

    const source = babel.transformFileSync(configFile, babelConfig(true)).code
    const fns = _eval(source, true)

    if (typeof fns[name] === 'function') {
      log.verbose('found config function for %s', name)

      return fns[name](config)
    } else {
      log.verbose('no config function four %s', name)
    }
  } else {
    log.verbose('no config file found')
  }

  return config
}

function fileExists (path) {
  try {
    fs.accessSync(path, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}

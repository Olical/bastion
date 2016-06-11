import fs from 'fs'
import * as babel from 'babel-core'
import _eval from 'eval'
import babelConfig from './babelConfig'
import log from './log'

const configFns = readConfigFns('bastion.conf.js')

export default function configPassthrough (name, config) {
  if (typeof configFns[name] === 'function') {
    log.verbose('found config function for %s', name)
    return configFns[name](config)
  } else {
    log.verbose('no config function four %s', name)
  }

  return config
}

function readConfigFns (configFile) {
  if (fileExists(configFile)) {
    log.verbose('found config file %s', configFile)
    const source = babel.transformFileSync(configFile, babelConfig(true)).code
    return _eval(source, configFile, {}, true)
  } else {
    log.verbose('no config file found at %s', configFile)

    return {}
  }
}

function fileExists (path) {
  try {
    fs.accessSync(path, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}

import path from 'path'
import fs from 'fs'
import _eval from 'eval'
import babelConfig from './babelConfig'
import webpack from 'webpack'
import log from './log'
import MemoryFS from 'memory-fs'

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

async function readConfigFns (configFile) {
  if (fileExists(configFile)) {
    log.verbose('found config file %s', configFile)
    const source = await compile(configFile)
    return _eval(source, configFile, {}, true)
  } else {
    log.verbose('no config file found at %s', configFile)
    return {}
  }
}

function compile (configFile) {
  const compiler = getCompiler(configFile)
  const mfs = new MemoryFS()
  compiler.outputFileSystem = mfs

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        log.error(err)
        reject(err)
      } else {
        log.verbose(stats.toString({
          colors: true,
          errorDetails: true
        }))

        const source = mfs.readFileSync(path.join('/', configFile), 'utf-8')
        log.verbose('compiled config file of length %d', source.length)
        resolve(source)
      }
    })
  })
}

function getCompiler (source) {
  const resolvers = {
    fallback: path.resolve(path.join(__dirname, '../node_modules'))
  }

  return webpack({
    entry: [
      path.join(process.cwd(), source)
    ],
    output: {
      path: '/',
      filename: source
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: babelConfig(true)
        }
      ]
    },
    resolve: resolvers,
    resolveLoader: resolvers
  })
}

function fileExists (path) {
  try {
    fs.accessSync(path, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}

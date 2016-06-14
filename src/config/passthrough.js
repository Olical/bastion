import vm from 'vm'
import path from 'path'
import fs from 'fs'
import MemoryFS from 'memory-fs'
import webpack from 'webpack'
import babelConfig from './babel'
import log from '../log'
import mixins from './mixins'

const configFnsPromise = readConfigFns('bastion.conf.js')

export default async function configPassthrough (name, config, options) {
  const configFns = await configFnsPromise

  if (typeof configFns[name] === 'function') {
    log.verbose('found config function for %s', name)
    const scope = mixins(config, options)[name]
    configFns[name].call(scope, config, options)
  } else {
    log.verbose('no config function for %s', name)
  }

  return config
}

function readConfigFns (configFile) {
  return new Promise(async function (resolve) {
    if (fileExists(configFile)) {
      log.verbose('found config file %s', configFile)
      const source = await compile(configFile)
      const fns = vm.runInThisContext(source, {
        filename: configFile,
        displayErrors: true
      })
      resolve(fns)
    } else {
      log.verbose('no config file found at %s', configFile)
      resolve({})
    }
  })
}

async function compile (configFile) {
  const compiler = await getCompiler(configFile)
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

async function getCompiler (source) {
  const resolvers = {
    fallback: path.resolve(path.join(__dirname, '../../node_modules'))
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
          query: await babelConfig(true)
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

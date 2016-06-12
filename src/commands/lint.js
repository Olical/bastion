import standard from 'standard'
import {
  flatMap,
  map,
  join,
  isEmpty
} from 'lodash'
import configPassthrough from '../configPassthrough'
import log from '../log'

export default async function lint (source, options) {
  log.verbose('source: %j', source)

  try {
    const lintConfig = await configPassthrough('standard', {
      parser: 'babel-eslint'
    }, options)

    const lintResults = flatMap((await runStandard(source, lintConfig)).results, (file) => {
      return map(file.messages, (error) => {
        const path = file.filePath
        const {line, column, message} = error

        return `${path}:${line}:${column}: ${message}`
      })
    })

    if (!isEmpty(lintResults)) {
      process.stdout.write(join(lintResults, '\n') + '\n')
      process.exit(1)
    }
  } catch (e) {
    log.error(e.stack)
    process.exit(1)
  }
}

function runStandard (source, lintConfig) {
  return new Promise((resolve, reject) => {
    standard.lintFiles(source, lintConfig, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

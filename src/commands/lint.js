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
    const lintResults = flatMap((await runStandard(source)).results, (file) => {
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
    log.error(e)
    process.exit(1)
  }
}

function runStandard (source) {
  const lintConfig = configPassthrough('standard', {
    parser: 'babel-eslint'
  })

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

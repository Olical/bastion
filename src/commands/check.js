import standard from 'standard'
import {
  flatMap,
  map,
  join,
  isEmpty
} from 'lodash'

export default async function check (source) {
  try {
    const lintResults = flatMap((await lint(source)).results, (file) => {
      return map(file.messages, (error) => {
        const path = file.filePath
        const {line, column, message} = error

        return `${path}:${line}:${column}: ${message}`
      })
    })

    if (!isEmpty(lintResults)) {
      console.log(join(lintResults, '\n'))
    }
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

function lint (source) {
  const lintConfig = {
    parser: 'babel-eslint'
  }

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

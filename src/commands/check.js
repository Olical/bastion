import standard from 'standard'

export default async function check (source) {
  try {
    const lintResults = await lint(source)
    console.info(JSON.stringify(lintResults, null, 2))
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
    standard.lintFiles(source, lintConfig, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

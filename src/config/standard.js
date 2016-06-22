import path from 'path'
import configPassthrough from './passthrough'

export default async function standardConfig () {
  const baseConfig = {
    parser: path.join(__dirname, '../../node_modules/babel-eslint')
  }

  return await configPassthrough('standard', baseConfig)
}


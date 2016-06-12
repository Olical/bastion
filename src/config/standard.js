import configPassthrough from './passthrough'

export default async function standardConfig () {
  const baseConfig = {
    parser: 'babel-eslint'
  }

  return await configPassthrough('standard', baseConfig)
}


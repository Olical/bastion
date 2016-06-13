import program from 'commander'
import pkg from '../package.json'
import bundle from './bundle'

program
  .description('check and build your source (from the entry module) into a single bundled file')
  .option('-e, --entry <module>', 'root file to bundle [./src/entry]', './src/entry')
  .option('-b, --bundle <path>', 'path to write the bundle file to [./dist/bundle.js]', './dist/bundle.js')
  .option('-d, --dev [base]', 'start the dev server with an optional base directory [bundle directory]')
  .option('-p, --port <port>', 'dev server port [8080]', parseFloat, 8080)

program
  .version(pkg.version)
  .parse(process.argv)

bundle(program)

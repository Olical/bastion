import program from 'commander'
import pkg from '../package.json'
import bundle from './bundle'

program
  .usage('[entry] [bundle]')
  .description('check and build your source (from the entry module) into a single bundled file')
  .option('-d, --dev', 'start the dev server')
  .option('-p, --port <port>', 'dev server port [8080]', parseFloat, 8080)
  .option('-b, --base <dir>', 'directory to host the dev server from')

program
  .version(pkg.version)
  .parse(process.argv)

bundle(program.entry, program.bundle, program)

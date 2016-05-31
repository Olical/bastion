import program from 'commander'
import pkg from '../package.json'
import slb from './index'

program
  .command('build <source> <destination>')
  .description('compiles the given source directory into the destination file')
  .action(slb.build)

program
  .action(() => program.outputHelp())

program
  .version(pkg.version)
  .parse(process.argv)

import program from 'commander'
import pkg from '../package.json'
import slb from './index'

program
  .command('build <source> <destination>')
  .description('compiles the given source file into the destination file')
  .action(slb.build)

program
  .command('serve <source> <destination>')
  .description('compiles and serves the source file with hot module reloading into the destination file')
  .action(slb.serve)

program
  .action(() => program.outputHelp())

program
  .version(pkg.version)
  .parse(process.argv)

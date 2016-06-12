import program from 'commander'
import pkg from '../package.json'
import bundle from './commands/bundle'
import lint from './commands/lint'

program
  .command('bundle [entry] [bundle]')
  .description('bundles the given entry file (and the dependencies) into the bundle file')
  .option('-d, --dev', 'start the dev server')
  .option('-p, --port <port>', 'dev server port [8080]', parseFloat, 8080)
  .option('-b, --base <dir>', 'directory to host the dev server from')
  .action(bundle)

program
  .command('lint [sources...]')
  .description('lint the given source globs, defaults to all files in the project')
  .action(lint)

program
  .action(() => program.outputHelp())

program
  .version(pkg.version)
  .parse(process.argv)

if (!program.args.length) {
  program.help()
}

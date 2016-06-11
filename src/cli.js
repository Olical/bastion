import program from 'commander'
import pkg from '../package.json'
import bundle from './commands/bundle'
import lint from './commands/lint'

program
  .command('bundle [entry] [bundle]')
  .description([
    'bundles the given entry file (and the dependencies) into the bundle file',
    'entry defaults to "./src/index.js" and bundle defaults to "./dist/bundle.js"'
  ].join('\n\t\t\t\t\t'))
  .option('-d, --dev', 'start the dev server')
  .option('-b, --base <dir>', 'directory to host the dev server from')
  .action((entryFile, bundleFile, options) => {
    return bundle(
      entryFile || './src/index.js',
      bundleFile || './dist/bundle.js',
      options
    )
  })

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

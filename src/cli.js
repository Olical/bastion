import program from 'commander'
import pkg from '../package.json'
import bastion from './index'

program
  .command('bundle <entry> <bundle>')
  .description('bundles the given entry file (and the dependencies) into the bundle file')
  .option('-d, --dev', 'start the HMR dev server')
  .option('-b, --base <dir>', 'directory to host the dev server from')
  .action(bastion.bundle)

program
  .command('check <source>')
  .description('lint, type check and test the source files')
  .action(bastion.check)

program
  .action(() => program.outputHelp())

program
  .version(pkg.version)
  .parse(process.argv)

if (!program.args.length) {
  program.help()
}

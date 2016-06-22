# bastion changes

## v1.8.0

 * Fix paths for standard/babel loaders and babel-eslint.
 * Improve documentation of mixins and their dependencies.

## v1.7.0

 * Full readme rewrite.
 * Added mixins.
 * React HMR.
 * Elm seamless compilation on import and HMR.

## v1.6.0

 * Readme tweaks.
 * Shuffle around CLI.
 * Config improvements.
 * Bring in scope slightly.
 * Better exit statuses.
 * Better builds.

## v1.5.0

 * `bastion.conf.js` is full babel / webpacked.
 * Remove react stuff, easy to add in config.
 * Readme things.
 * Usability things (like logs and defaults).
 * Code cleanup.
 * More async stuff because config compiling now requires async code.
 * Only compile / execute config once.
 * Use `vm` over `eval` (the npm module).
 * Generally made the current standard, webpack, babel combo awesome.
 * Started an example repository at https://github.com/Olical/bastion-example

## v1.4.0

 * Readme improvements.
 * Added configuration support for the current three modules.

## v1.3.1

 * Fix dev server in a non-react project, I will make react stuff config or flag based later.

## v1.3.0

 * Fix bundle outside of the bastion directory, kind of essential.
 * More readme things, small though.
 * Compile bastion and lint bastion with bastion during tests.

## v1.2.0

 * Lots of readme improvements.
 * Lint the source in Travis CI.
 * Check -> Lint.
 * Support multiple lint globs.

## v1.1.0

 * Fix `bundle`, it was working pre-v1 but I broke it with the `check`.
 * Working `check`.
 * Improve readme things.

## v1.0.0

 * Initial release, kinda broken, just reserving the name.

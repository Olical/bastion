# bastion [![npm version](https://badge.fury.io/js/bastion.svg)](https://badge.fury.io/js/bastion) [![Build Status](https://travis-ci.org/Olical/bastion.svg?branch=master)](https://travis-ci.org/Olical/bastion) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Combines a modern JavaScript toolchain into a single command so you can stop worrying about configuration and just get to work on your application. This means you can resume playing [Overwatch][] as soon as possible!

Bastion combines the following technologies into one easy to use package:

 * [babel][]
 * [webpack][]
 * [standard][]

![bastion][bastion-img]

## Rationale

I got bored of all the things you have to set up to make JavaScript bearable so I thought I'd put a single tool together that orchestrated it all. I'm following in [standard][]'s footsteps and assuming defaults for everything for the sake of time and sanity. This will fit my workflow well, it may not fit yours but it prevents bikeshedding, just like standard.

## Features

 * [x] Production builds
 * [x] Modern syntax support
 * [x] Sourcemaps
 * [x] Development web server
 * [x] Hot module reloading
 * [x] Opinionated linting
 * [x] Configurable
 * [ ] Testing

## Installation

You can install `bastion` globally or as a dev dependency local to your project. If you do the latter (which I recommend!) you can then set up a `Makefile` or build script that executes the local script.

```bash
npm install --save-dev bastion
./node_modules/.bin/bastion --help

# or

npm install -g bastion
bastion --help
```

## Configuration

Everything should work out of the box, that's the idea. If you do find yourself needing to tweak configuration however you can create a `bastion.conf.js` file in the directory that you're going to be executing bastion from.

To configure individual components (the ones listed at the top of this repository) simply export a function from this file (using any ES6+ code you want, it's parsed with bastion's babel!) with the same name. It will be given the config, you can return your modified version.

```javascript
export function webpack (config, options) {
  console.log('webpack config', config)
  console.log('is webpack dev mode?', options.dev)
  return config
}

export function standard (config) {
  console.log('standard config', config)
  return config
}

export function babel (config) {
  console.log('babel config', config)
  return config
}
```

## Usage

```bash
# Bundles ./src/entry to ./dist/bundle.js by default
# Lints and checks code as part of this
bastion

# There's a bunch of options, just use bastion -h for more
# The defaults essentially call this though
bastion ./src/entry ./dist/bundle.js --port 8080 --dev --base ./dist

# --dev enables the dev server with hot reloading
# It will continue to lint / check your files as you change them too
```

## Author

[Oliver Caldwell][author-site] ([@OliverCaldwell][author-twitter])

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[webpack]: https://webpack.github.io/
[standard]: http://standardjs.com/index.html
[babel]: https://babeljs.io/
[unlicense]: http://unlicense.org/
[author-site]: http://oli.me.uk/
[author-twitter]: https://twitter.com/OliverCaldwell
[overwatch]: https://playoverwatch.com/
[bastion-img]: https://raw.githubusercontent.com/Olical/bastion/master/bastion.jpg

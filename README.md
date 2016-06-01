# bastion [![npm version](https://badge.fury.io/js/bastion.svg)](https://badge.fury.io/js/bastion) [![Build Status](https://travis-ci.org/Olical/bastion.svg?branch=master)](https://travis-ci.org/Olical/bastion) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Combines a modern JavaScript toolchain into a single program so you can stop worrying about configuration and just get to work on your application. This means you can get back to playing [Overwatch][] as soon as possible!

Bastion combines the following technologies into one easy to use package:

 * [babel][]
 * [webpack][]
 * [standard][]
 * [ava][]

![bastion](https://raw.githubusercontent.com/Olical/bastion/master/bastion.jpg)

## Rationale

I got bored of all the things you have to set up to make JavaScript bearable so I thought I'd put a single tool together that orchestrated it all. I'm following in [standard][]'s footsteps and assuming defaults for everything for the sake of time and sanity. This will fit my workflow well, it may not fit yours but it prevents bikeshedding, just like standard.

## Features

 * [x] Production builds
 * [x] Modern syntax support
 * [x] Sourcemaps
 * [x] Development web server
 * [x] Hot module reloading
 * [x] Opinionated linting
 * [ ] Testing
 * [ ] Configurable (including webpack loaders)
 * [ ] Build node scripts with babel
 * [ ] Run node scripts with babel
 * [ ] Test coverage
 * [ ] Gradual typing
 * [ ] Performance benchmarks

## Installation

You can install `bastion` globally with `npm install -g bastion` or as a dev dependency local to your project. If you do the latter (which I recommend!) you can then set up a `Makefile` or build script that uses the local executable.

```bash
npm install --save-dev bastion
./node_modules/.bin/bastion --help
```

## Examples

### Bundle

```bash
# The ./ for your source file is important.
# It follows normal node modules rules.
bastion bundle ./src/index.js ./dist/bundle.js
```

### Bundle, serve and watch with HMR

```bash
bastion bundle --dev --base ./dist ./src/index.js ./dist/bundle.js
open http://localhost:8080/
```

### Lint

```bash
bastion lint
bastion lint src/SomeFile.js
bastion lint "src/**/*.js" "test/OtherFile-*.js"
```

## Author

[Oliver Caldwell][author-site] ([@OliverCaldwell][author-twitter])

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[justdoit]: https://www.youtube.com/watch?v=ZXsQAXx_ao0
[webpack]: https://webpack.github.io/
[standard]: http://standardjs.com/index.html
[babel]: https://babeljs.io/
[ava]: https://github.com/avajs/ava
[unlicense]: http://unlicense.org/
[author-site]: http://oli.me.uk/
[author-twitter]: https://twitter.com/OliverCaldwell
[overwatch]: https://playoverwatch.com/
[react-hot-loader]: https://github.com/gaearon/react-hot-loader

# bastion

Does the crappy JavaScript tooling dance so you don't have to.

| What you get  | Package       |
| ------------- | ------------- |
| Builds        | [webpack][]   |
| Linting       | [standard][]  |
| Syntax        | [babel][]     |
| Testing       | [ava][]       |
| Types         | [flow][]      |

## Rationale

I got bored of all the things you have to set up to make JavaScript at least passable as a language so I thought I'd put a single tool together that orchestrated it all. I'm following in standard's footsteps and assuming defaults for everything for the sake of time and sanity. This will fit my workflow well, it may not fit yours but it solves bikeshedding, just like standard.

## Features

 * [x] Production builds
 * [x] Modern syntax support
 * [x] Sourcemaps
 * [x] Development web server
 * [x] Hot module reloading (+ `react-hot-loader`)
 * [ ] Opinionated linting
 * [ ] Optional type checking
 * [ ] Testing
 * [ ] Test coverage
 * [ ] Performance benchmarks
 * [ ] Elm loader
 * [ ] CSS loader

## Installation

You can install `bastion` globally with `npm install -g bastion` or as a dev dependency local to your project. If you do the latter (which I recommend!) you can then set up a `Makefile` or build script that uses the local executable.

```bash
npm install --save-dev bastion
./node_modules/.bin/bastion --help
```

## Usage

### Bundle

```bash
bastion bundle ./src/index.js ./dist/bundle.js
```

### Bundle, serve and watch with HMR

```bash
bastion bundle --dev --base ./dist ./src/index.js ./dist/bundle.js
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
[flow]: http://flowtype.org/
[unlicense]: http://unlicense.org/
[author-site]: http://oli.me.uk/
[author-twitter]: https://twitter.com/OliverCaldwell

# bastion [![npm version](https://badge.fury.io/js/bastion.svg)](https://badge.fury.io/js/bastion) [![Build Status](https://travis-ci.org/Olical/bastion.svg?branch=master)](https://travis-ci.org/Olical/bastion) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

[![asciicast](https://asciinema.org/a/48990.png)](https://asciinema.org/a/48990)

```bash
npm install -g bastion
bastion --help
```

## The problem

If you're new to JavaScript or have been building applications with it for years you probably realise how many things need to come together in just the right way to produce a comfortable environment. You spend time configuring your linting, builds, minification and maybe transpilation from ES7 and beyond, all the way down to today's version of the language.

You eventually get bored of running `browserify` or the RequireJS optimiser by hand and reloading the page on each change. So you implement [webpack][] (with 100+ lines of configuration), automatic building and linting, then you add reloading and finally hot module reloading. Suddenly your code is dancing and firing into your browser as you change it.

Then you start your next project, you remember how much you need to get back to the point you were at yesterday, the tooling dread sets in. The [bikeshedding][] with your team begins. Prepare to [shave the yak][yak-shave] yet again.

## The solution

If you've used something like [ClojureScript][] you'll know how easy it is to get a new project running.

```bash
lein new chestnut foo
cd foo
lein figwhell
```

Then you have a hot reloading environment with tests and all, amazing! We want our tools to *just work* with sane defaults. The very popular [standard][] linter is a testament to this.

This is where bastion comes in, it assumes everything you need to get a modern build with great linting and a production bundle in one command. It can provide a reloading development server out of the box.

You can find an example on [asciinema][] or in the [bastion-example][] repository which tries to use most facets of the tool.

## Inspiration

Bastion tries to follow the ideas of some great tools, namely:

 * [leiningen][]
 * [standard][]
 * [elm][elm-platform]
 * [figwheel][]

Anything that gets you up and running quickly then continues to help your productivity over time. That's what I want for JavaScript (or things that compile to it such as [Elm][]).

![bastion][bastion-img]

> [Bastion][bastion-hero], a defence hero from [Overwatch][].

## Features

 * Build a tree of files into a single optimised bundle (through a pre-configured [webpack][]).
 * Allow you to use extremely modern JavaScript features (through a pre-configured [babel][]).
 * Lint your JavaScript with opinionated defaults (through [standard][], it requires no configuration really).
 * Modify and add to the above with flexible (and **optional**) configuration in `bastion.conf.js`.
 * Use mixins like `this.elm()` in the configuration to get instant features.
 * Development server with automatic reloading and sourcemaps.
 * Hot module reloading for things like React and Elm in one line.

## Usage

First off, you'll need to either install it globally or locally to your project. Both methods require you to call it in different ways, like any node project.

```bash
// Install it globally...
npm install -g bastion

// And call it globally.
bastion

// Install it locally...
npm install --save-dev bastion

// And call it locally.
./node_modules/.bin/bastion
```

Once you have your copy you can create your initial source file, bastion assumes this is called `./src/entry.js`, it will write the finished bundle to `./dist/bundle.js`. Use `bastion -h` to find the arguments you need for changing these paths.

```bash
vim src/entry.js

# So now you have a super modern JavaScript thing.
# Let's run bastion.

bastion

# The next step is to- oh, wait, we're done.
# If your script just logs to the console or something you can execute it with node.

node ./dist/bundle.js

# If it's intended for the browser you can refer to it with a script tag.
# I'd recommend putting an index.html in your dist directory that you can use with the dev server.
# Speaking of which...

bastion --dev
```

You now have a dev sever rebuilding your code as you change it and reloading your browser. It sets the base to `./dist/` and the port to `8080`, again, use the arguments to change that.

## Configuration

Say you've been working on a React application, building it with bastion. Let's add React hot loading support to our dev server.

```js
export function webpack () {
  this.react()
}
```

Oh, we're done. This is a mixin, there aren't many right now but they're really handy. Here's what is currently available and what you need to `npm install --save-dev` for them to work.

 * webpack
  * `react` - `react react-hot-loader`
  * `elm` - `elm-webpack-loader elm-hot-loader`

The configuration functions are passed two arguments.

 * `config` - The whole configuration object for that particular system.
 * `options` - Flags sent from the CLI like `dev` or `port`.

The functions mutate the configuration or call mixins for their tool, so far there are only configuration functions under the following names.

 * webpack
 * babel
 * standard

Feel free to create the function and log out the arguments, it'll show you just what's going on under the hood, you may even spot some values you'd like to tweak.

```js
export function babel (config, options) {
  console.log(config)
  console.log(options)

  // Now you know how bastion configures babel!
}
```

## Things I may want to add in the future

 * Tests out of the box
 * [Flow][] type checking
 * [Closure Compiler][]
 * More webpack loaders by default (like JSON and CSS)

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
[bastion-hero]: https://playoverwatch.com/en-us/heroes/bastion/
[bastion-example]: https://github.com/Olical/bastion-example
[clojurescript]: https://github.com/clojure/clojurescript
[bikeshedding]: https://en.wiktionary.org/wiki/bikeshedding
[yak-shave]: https://en.wiktionary.org/wiki/yak_shaving
[elm-platform]: https://github.com/elm-lang/elm-platform
[leiningen]: http://leiningen.org/
[figwheel]: https://github.com/bhauman/lein-figwheel
[elm]: http://elm-lang.org/
[react]: https://facebook.github.io/react/
[asciinema]: https://asciinema.org/a/48990
[flow]: https://flowtype.org/
[closure compiler]: https://developers.google.com/closure/compiler/

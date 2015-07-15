[![Build Status](https://travis-ci.org/jsx-ir/babel-plugin-jsx.svg?branch=master)](https://travis-ci.org/jsx-ir/babel-plugin-jsx)

## Babel Plugin for generating JSX-IR

### Overview

This plugin produces [JSX-IR](https://github.com/jsx-ir/spec) output of given JSX source. Main purpose of this plugin is to be used with [```jsx-runtime```](https://github.com/jsx-ir/jsx-runtime) and one or more its [renderers](https://github.com/jsx-ir?utf8=%E2%9C%93&query=jsx-to). But, of course, if could be used separately.

### Installation

```npm install  babel-plugin-jsx```

### Usage

Basic usage look like this:
```js
babel.transform(code, {
  plugins: ['babel-plugin-jsx'],
  blacklist: ['react']
});
```
or any other way described [here](http://babeljs.io/docs/advanced/plugins/#usage).

### Advanced usage (options)

Because Babel does not supports direct providing options for plugins (yet), here are some tricks:

First of all, you need to require "plugin-generator" which will generate for you plugin instance with specified options:
```js
var jsx = require('babel-plugin-jsx/gen');
```

Next you can generate plugin on the fly if you are using ``babel-core`` directly:
```js
var jsx = require('babel-plugin-jsx/gen');
var babel = require('babel-core');

babel.transform(code, {
  plugins: [jsx({
    ... // options goes here
  })],
  blacklist: ['react']
});
```
Or create special file in your package and use it as a module instead:
```js
// my-local-plugin.js
module.exports = require('babel-plugin-jsx/gen')({
  ... // options goes here
});
```
then use it in other place like ``index.js``:
```js
babel.transform(code, {
  plugins: ['./my-local-plugin'],
  blacklist: ['react']
});
```

#### Options and combinations

There is some number of options, first and main option is ```captureScope```:
* ```captureScope``` [boolean] - when enabled plugin looks for current scope to find same variables as JSX source tags. For example, this code ``<div></div>`` will produce ``{ tag: 'div', ... }`` when capture is disabled and ``{ tag: ['div', div], ...}`` when capture is enabled -- plugin captures variable for feature use by runtime.
* ```builtins``` [Array<string>] - only has effect when ``captureScope`` is ``true``. This options allows number of built-ins tags so plugin won't need to look for when in the scope. Usage of this options assumes that _renderer_ knows how to handle listed built-in tags. If this option is provided and used tag is not a _built-in_ and it's not in the current _scope_ when compilation error will be thrown.
* ```throwOnMissing``` [boolean] - only has effect when ``captureScope`` and ``builtins`` options are used simultaneously. By default this is ``true``, setting it to ``false`` means that plugin won't throw compilation error for missed tags, instead it will produce normal _scope output_ and if variable is missing you will get an runtime error.

### Examples

#### Example of input

```xml
<div className="box">
  <List>
    <div className="list-wrap">
      <ListItem index={ index } {... val } />
    </div>
  </List>
</div>
```

### Example of output

```js
({
  tag: "div",
  props: {
    className: "box"
  },
  children: [{
    tag: "List",
    props: null,
    children: [{
      tag: "div",
      props: {
        className: "list-wrap"
      },
      children: [{
        tag: "ListItem",
        props: _extends({
          index: index
        }, val),
        children: null
      }]
    }]
  }]
})
```

### License

[MIT](LICESE.md)
## JSX-IR Babel Plugin

This plugin produces [JSX-IR](https://github.com/jsx-ir/spec) output of given JSX source. It's intended to use with [```jsx-runtime```](https://github.com/jsx-ir/jsx-runtime) and one or more its [renders](https://github.com/jsx-ir?utf8=%E2%9C%93&query=jsx-to).

### Install

```npm install --save-dev babel-plugin-jsx```

### Example of input

```js
<div foo-bar="baz" data-test="123" {... a} blah ns:prop aria-role="button">
  zzZzzzZ -- {data.text} 123
  <blah:Test></blah:Test>
  <blah.Test.zzz></blah.Test.zzz>
</div>
```

### Example of output

```js
({
  tag: "div",
  props: _extends({
    "foo-bar": "baz",
    "data-test": "123"
  }, a, {
    blah: true,
    "ns:prop": true,
    "aria-role": "button"
  }),
  children: ["zzZzzzZ -- ", data.text, " 123", {
    tag: "blah:Test",
    props: null,
    children: null
  }, {
    tag: "zzz.Test.blah",
    props: null,
    children: null
  }]
});
```
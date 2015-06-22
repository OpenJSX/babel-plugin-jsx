## JSX-IR Babel Plugin

### Install

```npm install --save-dev babel-plugin-jsx-ir```

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
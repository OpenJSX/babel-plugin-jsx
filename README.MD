## Example of input

```js
var a = {
  zzz: 134,
  foo: 'baz'
};

export default (data) =>

<div foo-bar="baz" data-test="123" {... a} blah ns:prop aria-role="button">
  zzZzzzZ -- {data.text} 123
  <blah:Test></blah:Test>
  <blah.Test.zzz></blah.Test.zzz>
</div>
```

## Example of output

```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var a = {
  zzz: 134,
  foo: "baz"
};

exports["default"] = function (data) {
  return {
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
      tag: "blah.Test.zzz",
      props: null,
      children: null
    }]
  };
};

module.exports = exports["default"];
```
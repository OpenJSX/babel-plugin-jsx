## Example of input

```js
var a = {
  zzz: 134,
  foo: 'baz'
};

export default (data) =>

<div  cui:control-zz="tested" data-test="123" {... a} blah cui:lol aria:role="ggg">
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
      "cui:control-zz": "tested",
      "data-test": "123"
    }, a, {
      blah: true,
      "cui:lol": true,
      "aria:role": "ggg"
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var a = {
  zzz: 134,
  foo: "baz"
};

var Test = function Test() {
  return {};
};

var blah = {
  Test: {
    zzz: function zzz() {}
  }
};

exports["default"] = function (data) {
  return Test({
    tag: "Test",
    props: _extends({
      "foo-bar": "baz",
      b: undefined,
      a: undefined.test,
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
    }, blah.Test.zzz({
      tag: "blah.Test.zzz",
      props: null,
      children: null
    })]
  });
};

module.exports = exports["default"];
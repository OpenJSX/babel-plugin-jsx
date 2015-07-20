'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var a = {
  zzz: 134,
  foo: 'baz'
};

var Test = function Test() {
  return {};
};

var blah = {
  Test: {
    zzz: function zzz() {}
  }
};

var meta = function meta() {
  console.log('out', arguments);

  return function () {
    console.log('in', arguments);
  };
};

exports['default'] = function (data) {
  ({
    tag: ['Test', Test],
    props: _extends({
      'foo-bar': 'baz',
      b: undefined,
      a: undefined.test,
      'data-test': '123'
    }, a, {
      blah: true,
      'ns:prop': true,
      'aria-role': 'button'
    }),
    children: [{
      tag: 'ZZZ',
      props: null,
      children: null
    }, 'zzZzzzZ -- ', data.text, ' 123', {
      tag: 'blah:Test',
      props: null,
      children: null
    }, {
      tag: ['blah.Test.zzz', blah.Test.zzz],
      props: null,
      children: null
    }, {
      tag: 'blah-blah',
      props: null,
      children: null
    }]
  });
};

module.exports = exports['default'];
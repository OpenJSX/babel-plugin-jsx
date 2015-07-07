var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var a = {
  zzz: 134,
  foo: "baz"
};

var div = function () {
  return {};
};

export default data => ({
  tag: "div",
  props: _extends({
    "foo-bar": "baz",
    b: this,
    a: this.test,
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
})
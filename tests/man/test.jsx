var a = {
  zzz: 134,
  foo: 'baz'
};

var Test = function() {
  return {};
};

var blah = {
  Test: {
    zzz: function() {}
  }
};

var meta = function() {
  console.log('out', arguments);

  return function() {
    console.log('in', arguments);
  };
};

export default (data) => {
  <Test foo-bar="baz" b={this} a={this.test} data-test="123" {... a} blah ns:prop aria-role="button">
    <ZZZ></ZZZ>
    zzZzzzZ -- {data.text} 123
    <blah:Test></blah:Test>
    <blah.Test.zzz></blah.Test.zzz>
    <blah-blah></blah-blah>
  </Test>
}
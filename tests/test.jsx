var a = {
  zzz: 134,
  foo: 'baz'
};

var div = function() {
  return {};
};

export default (data) =>

<div foo-bar="baz" data-test="123" {... a} blah ns:prop aria-role="button">
  zzZzzzZ -- {data.text} 123
  <blah:Test></blah:Test>
  <blah.Test.zzz></blah.Test.zzz>
</div>
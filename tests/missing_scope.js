var babel = require('babel-core');
var jsx = require('../gen');
var assert = require('assert');
var MissingScopeError = require('../lib/missing_scope_error');

var pluginEmptyBuiltins = jsx({
  captureScope: true,
  builtins: []
});

describe('missing_scope', function() {
  it('should miss', function() {
    assert.throws(function() {
      var result = babel.transform(code, {
        plugins: [pluginEmptyBuiltins],
        blacklist: ['react']
      });
    }, function(err) {
      if (
        err instanceof MissingScopeError &&
        err.message.indexOf('<CustomTag>') !== -1
      ) {
        return true;
      }
    }, 'Not scope error');
  });
});

var code = 'export default () => \n' +
  '<CustomTag></CustomTag>';
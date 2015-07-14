"use strict";

var babel = require('babel-core');
var jsx = require('../gen');
var assert = require('assert');

var pluginEmptyBuiltins = jsx({
  captureScope: true,
  builtins: [],
  throwOnMissing: true
});

describe('missing_scope', function() {
  it('should throw', function() {
    assert.throws(function() {
      var result = babel.transform(code, {
        plugins: [pluginEmptyBuiltins],
        blacklist: ['react']
      });
    }, function(err) {
      if (
        err.message.indexOf('<CustomTag>') !== -1
      ) {
        return true;
      }
    }, 'Not scope error');
  });
});

var code = 'export default () => \n' +
  '<CustomTag></CustomTag>';
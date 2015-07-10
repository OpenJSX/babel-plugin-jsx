var fs = require('fs');
var path = require('path');
var assert = require('assert');
var vm = require('vm');
var babel = require('babel-core');
var jsx = require('../gen');
var Module = require('module');

var testsFolder = path.join(__dirname, 'syntax');
var dir = fs.readdirSync(testsFolder);

var pluginSimple = jsx({
  captureScope: false
});

var pluginScoped = jsx({
  captureScope: true
});

describe('syntax', function() {
  dir.forEach(function(dirName) {
    var header = require(path.join(testsFolder, dirName, 'header.js'));

    if (header.builtins) {
      var pluginBuiltins = jsx({
        captureScope: true,
        builtins: header.builtins
      })
    }

    describe(dirName + ': ' + header.title, function() {
      header.files.forEach(function(fileName) {
        describe(fileName, function() {
          var p = path.join(testsFolder, dirName, fileName);
          var file = fs.readFileSync(p, 'utf-8');
          testFile(file, p);
        });
      });
    });

    function testFile(file, filePath) {
      var map = {
        simple: pluginSimple,
        scoped: pluginScoped,
        builtins: pluginBuiltins
      };

      Object.keys(map).forEach(function(key) {
        var plugin = map[key];

        if (!plugin) return;

        it(key, function() {
          var result = babel.transform(file, {
            plugins: [plugin],
            blacklist: ['react']
          });

          var mod = requireString(result.code, filePath);
          var input = mod.input();

          if (mod[key]) {
            assert.deepEqual(input, mod[key]());
          }
        });
      });
    }
  });
});

function requireString(src, file) {
  var newModule = new Module();

  newModule._compile(src, file);
  return newModule.exports;
}

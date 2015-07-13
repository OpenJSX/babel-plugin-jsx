var fs = require('fs');
var path = require('path');
var assert = require('assert');
var babel = require('babel-core');
var jsx = require('../gen');
var Module = require('module');

var testsFolder = path.join(__dirname, 'syntax');
var dir = fs.readdirSync(testsFolder);

var pluginSimple = jsx({
  captureScope: false,
  throwOnMissing: false
});

var pluginScoped = jsx({
  captureScope: true,
  throwOnMissing: false
});

describe('syntax', function() {
  dir.forEach(function(dirName) {
    var header = require(path.join(testsFolder, dirName, '_header.js'));

    if (header.builtins) {
      var pluginBuiltins = jsx({
        captureScope: true,
        builtins: header.builtins,
        throwOnMissing: false
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

        var result = babel.transform(file, {
          plugins: [plugin],
          blacklist: ['react']
        });

        var mod = requireString(result.code, filePath);

        if (mod[key]) {
          it(key, mod[key]);
        }
      });
    }
  });
});

function requireString(src, file) {
  var newModule = new Module();

  newModule._compile(src, file);
  return newModule.exports;
}

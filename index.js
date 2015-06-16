var babel = require('babel-core');
var fs = require('fs');
var path = require('path');

var code = fs.readFileSync(path.join(__dirname, 'tests/test.jsx'));

var result = babel.transform(code, {
  plugins: ['./babel-jsx'],
  blacklist: ['react']
});

console.log(result.code);
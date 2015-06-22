var babel = require('babel-core');
var fs = require('fs');
var path = require('path');


var jsx = require('./gen');
var code = fs.readFileSync(path.join(__dirname, 'tests/test.jsx'));

var result = babel.transform(code, {
  plugins: [jsx({})],
  blacklist: ['react']
});

fs.writeFileSync(path.join(__dirname, 'test-out.js'), result.code);
console.log(result.code);
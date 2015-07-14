"use strict";

var jsx = require('./lib/babel-jsx');

module.exports = function(options) {
  return function(babel) {
    return jsx.call(this, babel, options);
  };
};
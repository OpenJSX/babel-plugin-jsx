"use strict";

var jsx = require('./lib/babel-jsx');

module.exports = function gen(options) {
  var plugin = function(babel) {
    return jsx.call(this, babel, options);
  };

  plugin.gen = gen;
  return plugin;
};
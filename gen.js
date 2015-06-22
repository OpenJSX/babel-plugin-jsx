var jsx = require('./babel-jsx');

module.exports = function(options) {
  return function(babel) {
    return jsx.call(this, babel, options);
  };
};
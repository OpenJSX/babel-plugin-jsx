function MissingScopeError(message) {
  this.message = message;
  this.name = 'MissingScopeError';

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, MissingScopeError);
  }
}

MissingScopeError.prototype = Object.create(Error.prototype);
module.exports = MissingScopeError;
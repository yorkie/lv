
var util = require('util');
var Writable = require('stream').Writable;

function AST() {
  Writable.call(this);
}
util.inherits(AST, Writable);

AST.prototype._write = function(chunk, encoding, callback) {
  console.log(chunk.toString());
  callback();
}

module.exports = AST;
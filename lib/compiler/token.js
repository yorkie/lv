
var util = require('util');
var Readable = require('stream').Readable;
var keywords = require('./reserved-words.json');

function Tokenizer(str) {
  Readable.call(this);
  this._buffer = str;
}
util.inherits(Tokenizer, Readable);

Tokenizer.prototype._read = function() {
  var self = this;
  this._buffer.split(' ').forEach(function(item) {
    self.push(item);
  });
  this.push(null);
}

function tokenize(str) {
  return new Tokenizer(str);
}

module.exports = tokenize;
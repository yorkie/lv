
var util = require('util');
var stream = require('stream');
var readline = require('readline');
var tokenize = require('./token');

function Parser(upstream) {
  stream.Writable.call(this);

  var self = this;
  this._rl = readline.createInterface({
    input: upstream,
    output: self,
    terminal: false
  });
  this._rl.on('line', this._onLine);
}

Parser.prototype._onLine = function(line) {
  if (line) {
    tokenizer(line);
  }
}

module.exports = Parser;
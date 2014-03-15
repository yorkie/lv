
var util = require('util');
var stream = require('stream');
var readline = require('readline');
var tokenize = require('./token');
var AST = require('./ast');

function Parser(upstream) {
  stream.Writable.call(this);

  var self = this;
  this._rl = readline.createInterface({
    input: upstream,
    output: self,
    terminal: false
  });
  this._rl.on('line', function(line) {
    self._parseLine.call(self, line);
  });

  // build ast
  this._ast = new AST();
}

Parser.prototype._parseLine = function(line) {
  if (line) {
    tokenize(line).pipe(this._ast)
  }
}

module.exports = Parser;
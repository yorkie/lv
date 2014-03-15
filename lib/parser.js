
var fs = require('fs');
var path = require('path');
var util = require('util');
var asm = require('./asm');

var esprima = require('esprima');
var EventEmitter = require('events').EventEmitter;

function Parser(filename) {
  EventEmitter.call(this);
  this.program = new asm();
  this.loadFile(filename);
}
util.inherits(Parser, EventEmitter);

Parser.prototype.loadFile = function(filename) {
  var self = this;
  var rp = path.join(__dirname, filename);
  fs.readFile(path.join(__dirname, filename), function(err, file) {
    if (err)
      return self.emit('error', err);
    else
      return self.parse(file.toString('utf8'));
  });
}

Parser.prototype.parse = function(source) {
  var self = this;
  this.source = source;
  this.esContext = esprima.parse(source);
  if (!this.esContext.body) {
    return console.warn('Empty Program');
  }

  this.esContext.body.forEach(function(item) {
    self._statement.call(self, item);
  });
  this.emit('done', this.program.toString());
}

Parser.prototype._statement = function(item) {
  switch (item.type) {
    case 'ExpressionStatement':
      this._expr(item.expression);
      break;
  }
}

Parser.prototype._expr = function(item) {
  switch (item.type) {
    case 'CallExpression':
      this._callee(item.callee, item.arguments);
      break;
  }
}

Parser.prototype._symbol = function(item) {

}

Parser.prototype._callee = function(item) {

}

module.exports = Parser;

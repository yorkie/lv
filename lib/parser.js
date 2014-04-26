
var fs = require('fs');
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
  fs.readFile(filename, function(err, file) {
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
    case 'VariableDeclaration':
      this._decl(item);
      break;
    case 'ExpressionStatement':
      this._expr(item.expression);
      break;
    case 'IfStatement':
      this._ifstatement(item.test, item.consequent);
      break;
  };
}

Parser.prototype._decl = function(item) {
  var self = this;
  var declarations = item.declarations;
  if (item.type !== 'VariableDeclaration' || item.kind !== 'var') {
    this.emit('error', new Error('Syntax Error in ESPrima'));
  }

  declarations.forEach(function(item) {
    self.program.decl(item.id.name, item.init.value);
  });
}

Parser.prototype._expr = function(item) {
  switch (item.type) {
    case 'CallExpression':
      this._callee(item.callee, item.arguments);
      break;
  };
}

Parser.prototype._ifstatement = function(test, consequent) {
  console.log(test);
  // `Literal` that means i can decide it in compiler time
  if (test.type === 'Literal') {
    if (!test.value) {
      return;
    }
    consequent.body.forEach(function(item) {
      this._statement.call(this, item);
    }.bind(this));
    return;
  }

  // for other
  if (test.type === 'Identifier') {
    
  }
}

Parser.prototype._symbol = function(item) {
  var ret = [];
  if (item.property) {
    ret.push(item.property.name);
  }

  switch (item.type) {
    case 'MemberExpression':
      return ret.concat(this._symbol(item.object));
    case 'Identifier':
      return ret.push(item.name) && ret;
  };
}

Parser.prototype._callee = function(item, args) {
  var symbols = this._symbol(item).reverse();
  if (symbols[0] == 'sys') {
    this.program.pushSyscall(symbols[1], args);
  }
}

module.exports = Parser;

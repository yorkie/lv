
const fs = require('fs');
const assert = require('assert');
const Assembly = require('./asm');

const esprima = require('esprima');
const EventEmitter = require('events').EventEmitter;

class Parser extends EventEmitter {
  constructor(filename) {
    super();
    this.program = new Assembly();
    this.loadFile(filename);
  }

  loadFile(filename) {
    fs.readFile(filename, (err, file) => {
      if (err)
        return this.emit('error', err);
      else
        return this.parse(file.toString('utf8'));
    });
  }

  parse(source) {
    this.source = source;
    this.esContext = esprima.parse(source);
    if (!this.esContext.body) {
      return console.warn('Empty Program');
    }

    this.esContext.body.forEach((item) => {
      this._statement.call(this, item);
    });
    this.emit('done', this.program.toString());
  }

  //
  // statement parser
  //
  _statement(item) {
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

  //
  // declearation
  // keywords: var, const
  //
  _decl(item) {
    assert.equal(item.type, 'VariableDeclaration');
    item.declarations.forEach((decl) => {
      this.program.decl(item.kind, decl);
    });
  }

  _expr(item) {
    switch (item.type) {
      case 'CallExpression':
        this._callee(item.callee, item.arguments);
        break;
    };
  }

  _ifstatement(test, consequent) {
    console.log(test, consequent);
    // `Literal` that means i can decide it in compiler time
    if (test.type === 'Literal') {
      if (!test.value) {
        return;
      }
      consequent.body.forEach((item) => {
        this._statement.call(this, item);
      });
      return;
    }

    // for other
    if (test.type === 'Identifier') {
      // TODO
    }
  }

  _symbol(item) {
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

  _callee(item, args) {
    var symbols = this._symbol(item).reverse();
    if (symbols[0] == 'sys') {
      this.program.pushSyscall(symbols[1], args);
    }
  }
};

module.exports = Parser;

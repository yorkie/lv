
var assert = require('assert');
var util = require('util');
var asm = require('./asm');
var addr = require('./addr');
var instructs = require('./instructs');
var registers = require('./registers.json');

//
// for `const` declaration: const variable
//
exports.declaration = function(name, init) {
  assert.equal(init.type, 'Literal', 
    'const assignment must be `literal`');
  
  var rtype = typeof init.value;
  literal.call(this, name, init.value);
  this.variablesTable[name] = {
    type: rtype,
    isConstant: true,
    scope: this.runtime.scope,
    initValue: init
  };
  return '';
};

//
// helper for declaration
//
function literal(name, value) {
  var lenSymbol = name + '_len';
  if (typeof value === 'number') {
    this.section.data.push(instructs.dd(name, value));
  } else {
    this.section.data.push(instructs.db(name, value));
    this.section.data.push(instructs.equ(lenSymbol, '$-'+name));
  }
};

//
// for `var` declaration: local variable
//
exports.declaration2 = function(name, init) {
  // compute offset
  var offset = 0;
  var rtype = typeof init.value;
  if (init.type === 'Literal') {
    if (rtype === 'boolean') {
      offset = 2;
    } else if (rtype === 'number') {
      offset = 16;
    } else if (rtype === 'string') {
      offset = init.value.length * 8;
    } else if (rtype === 'array' || 'object') {
      // will be pointer(to heap memory)
      offset = 16;
    }
  }

  // comulate stack offset and throw overflow reporter on condition
  this.runtime.stack.offset += offset;
  if (this.runtime.stack.offset > this.constants.stackSize)
    throw new Error('stack overflow: max size: '+ this.constants.stackSize);

  // generate op
  var pos = 'dword '+addr.byDirectOffset(registers.EBP, -this.runtime.stack.offset);
  var ret = [];
  if (init.type === 'Literal') {
    if (rtype === 'boolean')
      ret.push(instructs.mov(pos, +init.value));
    else if (rtype === 'number')
      ret.push(instructs.mov(pos, init.value));
    else if (rtype === 'string')
      ret.push(instructs.mov(pos, '\'' + init.value + '\''));
  }

  this.variablesTable[name] = {
    type: rtype,
    isConstant: false,
    scope: this.runtime.scope,
    initValue: init,
    accessor: addr.byDirectOffset(registers.EBP, -this.runtime.stack.offset),
    size: offset
  };
  return ret;
};

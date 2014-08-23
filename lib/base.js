
var util = require('util');
var asm = require('./asm');
var addr = require('./addr');
var instructs = require('./instructs');
var registers = require('./registers.json');


exports.declaration = function(name, init) {
  var initType;
  if (init.type === 'Literal') {
    literal.call(this, name, init.value);
    initType = typeof init.value;
  }
  return '';
}

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
  var pos = addr.byDirectOffset(registers.EBX, this.runtime.stack.offset);
  var ret = [];
  if (init.type === 'Literal') {
    if (rtype === 'boolean')
      ret.push(instructs.mov(registers.EAX, +init.value));
    else if (rtype === 'number')
      ret.push(instructs.mov(registers.EAX, init.value));
  }
  ret.push(instructs.mov(pos, registers.EAX));
  return ret;
}

function literal(name, value) {
  var lenSymbol = name + '_len';
  if (typeof value === 'number') {
    this.section.data.push(instructs.dd(name, value));
  } else {
    this.section.data.push(instructs.db(name, value));
    this.section.data.push(instructs.equ(lenSymbol, '$-'+name));
  }
}

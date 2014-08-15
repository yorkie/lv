
var util = require('util');
var asm = require('./asm');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.declaration = function(name, init) {
  var initType;
  if (init.type === 'Literal') {
    literal.call(this, name, init.value);
    initType = typeof init.value;
  }
  return '';
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

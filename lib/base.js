
var util = require('util');
var asm = require('./asm');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.declaration = function(name, value) {
  var lenSymbol = name + '_len';
  if (typeof value === 'number') {
    this.section.data.push(instructs.dd(name, value));
  } else {
    this.section.data.push(instructs.db(name, value));
    this.section.data.push(instructs.equ(lenSymbol, '$-'+name));
  }
  return '';
}
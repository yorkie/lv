
var util = require('util');
var asm = require('./asm');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.declaration = function(name, value) {
  this.section.data.push(instructs.db(name, value));
  return '';
}
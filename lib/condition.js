
var util = require('util');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.if = function(expr, iftrue) {
  return [
    instructs.mov(expr, registers.EDX, 'l'),
    instructs.mov(0x00, registers.EAX, 'l'),
    instructs.cmp(registers.EAX, registers.EDX, 'l'),
    instructs.je(iftrue)
  ];
}

exports.switch = function(expr, cases) {
  var tables = cases
    .sort(function(prev, next) {
      return prev.key - next.key;
    })
    .map(function(item) {
      return instructs.mov
    });
  // TODO
}
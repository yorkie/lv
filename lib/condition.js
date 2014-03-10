
var util = require('util');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.if = function(expr, body) {
  var symbol = util.format('_lamb_if_true_%d', parseNumber(Math.random()*100));
  return [
    instructs.mov(expr, registers.EDX),
    instructs.mov(0x00, registers.EAX),
    instructs.cmp(registers.EAX, registers.EDX, 'l'),
    instructs.je(symbol)
  ];
}

exports.else = function() {
  // TODO
}

exports.else_if = function() {
  // TODO
}

exports.switch = function() {
  // TODO
}
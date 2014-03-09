
var util = require('util');

exports.push = function(type, val) {
  return util.format('push %s %s', type, val);
}

exports.mov = function(reg, val) {
  return util.format('mov %s, %s', reg, val);
}

exports.sub = function(reg, val) {
  return util.format('sub %s, %s', reg, val);
}

exports.add = function(reg, val) {
  return util.format('add %s, %d', reg, val);
}

exports.int = function(val) {
  return 'int '+val;
}

exports.db = function(symbol, val) {
  if (typeof val === 'string') {
    val = util.format('"%s"', val);
  }
  return util.format('%s: db %s, 0x0a', symbol, val);
}

exports.equ = function(symbol, expr) {
  return util.format('%s: equ %s', symbol, expr);
}
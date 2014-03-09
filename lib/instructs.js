
var util = require('util');

exports.push = function(type, val) {
  var fmtstr = (typeof val === 'number')
    ?'push %s %d'
    :'push %s "%s"';
  return util.format(fmtstr, type, val);
}

exports.mov = function(reg, val) {
  return util.format('mov %s, %s', reg, val);
}

exports.sub = function(reg, val) {
  return util.format('sub %s, %s', reg, val);
}

exports.int = function(val) {
  return 'int '+val;
}

var util = require('util');

exports.push = function(type, val, opt) {
  if (type !== 'dword' && val !== undefined) {
    type = type+','
  }
  if (val === undefined) {
    val = '';
  }
  if (opt === 'l') {
    return util.format('pushl %s %s', type, val);
  } else {
    return util.format('push %s %s', type, val);
  }
};

exports.pop = function(type, opt) {
  if (opt === 'l') {
    return util.format('popl %s', type);
  } else {
    return util.format('pop %s', type);
  }
};

exports.mov = function(reg, val, opt) {
  var cmd = 'mov';
  if (/^[bwl]$/.test(opt))  {
    cmd += opt;
  }
  return util.format('%s %s, %s', cmd, reg, val);
};

exports.sub = function(reg, val, opt) {
  return util.format('sub %s, %s', reg, val);
};

exports.add = function(reg, val) {
  return util.format('add %s, %d', reg, val);
};

exports.cmp = function(a, b, opt) {
  var cmd = 'cmp';
  if (/^[bwl]$/.test(opt)) {
    cmd += opt;
  }
  return [cmd, a, b].join(' ');
};

exports.test = function(a, b, opt) {
  var cmd = 'test';
  if (/^[bwl]$/.test(opt)) {
    cmd += opt;
  }
  return [cmd, a, b].join(' ');
};

// jump
exports.jmp = function(label) {
  return 'jmp '+label;
};

// jump if not equal
exports.jne = function(label) {
  return 'jne '+label;
};

// jump if equal
exports.je = function(label) {
  return 'je '+label
};

// jump if negative
exports.js = function(label) {
  return 'js '+label;
};

// jump if non-negative
exports.jns = function(label) {
  return 'jns '+label;
};

// jump if bigger
exports.jg = function(label) {
  return 'jg '+label;
};

// jump if bigger or equal
exports.jge = function(label) {
  return 'jge '+label;
};

// jump if less
exports.jl = function(label) {
  return 'jl '+label;
};

// jump if less or equal
exports.jle = function(label) {
  return 'jle '+label;
};

exports.int = function(val) {
  return 'int '+val;
};

exports.db = function(symbol, val) {
  if (typeof val !== 'number') {
    var valarr = [];
    var valbuf = new Buffer(val);
    for (var i=0; i<valbuf.length; i++)
      valarr.push(valbuf[i]);
    return util.format('%s: db %s', symbol, valarr.join(', '));
  } else {
    return util.format('%s: db %s', symbol, '0x' + val);
  }
};

exports.dd = function(symbol, val) {
  return util.format('%s: dd %d', symbol, val);
};

exports.equ = function(symbol, expr) {
  return util.format('%s: equ %s', symbol, expr);
};

exports.ret = function() {
  return 'ret';
};

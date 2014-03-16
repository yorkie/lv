
var util = require('util');
var asm = require('./asm');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.exit = function(signal) {
  return [
    '; system call: exit',
    instructs.push('dword', signal || 0x00),
    instructs.mov(registers.EAX, 0x01),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80)
  ];
}

exports.fork = function() {
  return [
    instructs.mov(registers.EAX, 0x02),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80)
  ];
}

exports.read = function(symbol, fd) {
  var strSymbol = symbol;
  var lenSymbol = strSymbol + '_len';
  this.section.data.push(instructs.db(strSymbol, str));
  this.section.data.push(instructs.equ(lenSymbol, '$-'+strSymbol));
  return [
    instructs.push('dword', lenSymbol),
    instructs.push('dword', strSymbol),
    instructs.push('dword', fd || 0x01),
    instructs.mov(registers.EAX, 0x03),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80),
    instructs.add(registers.ESP, 0x10)
  ];
}

exports.write = function(str, fd) {
  var strSymbol = util.format('_lamb_var_%d', parseInt(Math.random()*100));
  var lenSymbol = strSymbol + '_len';
  this.section.data.push(instructs.db(strSymbol, str));
  this.section.data.push(instructs.equ(lenSymbol, '$-'+strSymbol));
  return [
    '; system call: write',
    instructs.push('dword', lenSymbol),
    instructs.push('dword', strSymbol),
    instructs.push('dword', fd || 0x01),
    instructs.mov(registers.EAX, 0x04),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80),
    instructs.add(registers.ESP, 0x10)
  ];
}

exports.open = function(path, option, fd) {
  // TODO
  return [
    instructs.push('dword', path)
  ]
}

exports.close = function(fd) {
  return [
    instructs.push('dword', fd),
    instructs.mov(registers.EAX, 0x05),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80)
  ];
}

exports.waitpid = function() {
  // TODO
}

exports.creat = function() {
  // TODO
}

exports.link = function() {
  // TODO
}

exports.unlink = function(path) {
  var symbol = util.format('_lamb_var_%d', parseInt(Math.random()*100));
  this.section.data.push(instructs.db(symbol, path));
  return [
    '; system call: unlink',
    instructs.push('dword', symbol),
    instructs.mov(registers.EAX, 0x0a),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80)
  ];
}

exports.execve = function() {
  // TODO
}

exports.chdir = function() {
  // TODO
}

exports.time = function() {
  // TODO
}

exports.mknod = function() {
  // TODO
}

exports.chmod = function() {
  // TODO
}

exports.lchown = function() {
  // TODO
}

exports.stat = function() {
  // TODO
}

exports.lseek = function() {
  // TODO
}

exports.getpid = function() {
  return [
    instructs.mov(registers.EAX, 0x14),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80)
  ];
}

exports.mount = function() {
  // TODO
}

exports.oldumount = function() {
  // TODO
}

exports.setuid = function() {
  // TODO
}

exports.getuid = function() {
  // TODO
}

exports.stime = function() {
  // TODO
}

exports.ptrace = function() {
  // TODO
}

exports.alarm = function() {
  // TODO
}

exports.fstat = function() {
  // TODO
}

exports.pause = function() {
  // TODO
}

exports.utime = function() {
  // TODO
}

exports.access = function() {
  // TODO
}

exports.nice = function() {
  // TODO
}

exports.sync = function() {
  // TODO
}

exports.kill = function() {
  // TODO
}

exports.rename = function() {
  // TODO
}

exports.mkdir = function() {
  // TODO
}

exports.rmdir = function() {
  // TODO
}

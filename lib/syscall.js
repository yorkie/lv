
var util = require('util');
var asm = require('./asm');
var registers = require('./registers.json');
var instructs = require('./instructs');

exports.exit = function(signal) {
  return [
    instructs.push('dword', signal || 0x00),
    instructs.mov(registers.EAX, 0x01),
    instructs.sub(registers.ESP, 0x04),
    instructs.int(0x80)
  ];
}

exports.fork = function(option) {
  // TODO
}

exports.read = function(len, symbol, fd) {
  // TODO
}

exports.write = function(str, fd) {
  var strSymbol = util.format('_lamb_var_%d', parseInt(Math.random()*100));
  var lenSymbol = strSymbol + '_len';
  this.section.data.push(instructs.db(strSymbol, str));
  this.section.data.push(instructs.equ(lenSymbol, '$-'+strSymbol));
  return [
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
  return [
    instructs.push('dword', path)
  ]
}

exports.close = function() {
  // TODO
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

exports.unlink = function() {
  // TODO
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

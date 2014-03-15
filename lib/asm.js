
var util = require('util');
var syscall = require('./syscall');

function asm() {
  this.init();
}

asm.prototype.init = function() {
  this.constants = {
    enter: 'main'
  };
  this.section = {
    text: [],
    data: []
  };
  this.source = '';
}

asm.prototype.getSectionText = function() {
  return this.section.text;
}

asm.prototype.getSectionData = function() {
  return this.section.data;
}

asm.prototype.trySyscall = function(syscall) {
  var args = Array.prototype.slice.call(arguments, 1);
  return syscall.apply(this, args).map(function(item) {
    return '  '+item;
  }).join('\n') + '\n\n';
}

asm.prototype.toString = function() {
  this.source += 'section .text\n\n';
  // define global variable
  this.source += util.format('global %s\n\n', this.constants.enter);
  // define main function
  this.source += util.format('%s:\n\n', this.constants.enter);

  // process exit()
  this.source += this.trySyscall(syscall.exit, 0);
  
  // declear .data section
  this.source += 'section .data\n\n';
  this.source += this.section.data.map(function(item) {
    return '  '+item;
  }).join('\n') + '\n\n';

  return this.source;
}

module.exports = asm;
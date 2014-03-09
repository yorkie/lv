
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

asm.prototype.toString = function() {
  this.source += 'section .text\n\n';
  // define global variable
  this.source += util.format('global %s\n\n', this.constants.enter);
  // define main function
  this.source += util.format('%s:\n\n', this.constants.enter);

  // process exit()
  this.source += syscall.exit(0).map(function(item) {
    return '  '+item;
  }).join('\n') + '\n\n';
  
  // declear .data section
  this.source += 'section .data\n\n';
  for (var i=0; i<this.section.data.length; i++) {
    this.source += util.format('  %s db "%s", 0xa');
  }
  return this.source;
}

module.exports = asm;
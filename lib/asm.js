
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

asm.prototype.pushSyscall = function(name, args) {
  this.section.text.push({
    type: 'syscall',
    name: name,
    args: args
  });
}

asm.prototype.trySyscall = function(syscall, args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return syscall.apply(this, args).map(function(item) {
    return '  '+item;
  }).join('\n') + '\n\n';
}

asm.prototype.toString = function() {
  var self = this;
  this.source += 'section .text\n\n';
  
  // define global variable
  this.source += util.format('global %s\n\n', this.constants.enter);
  
  // define main function
  this.source += util.format('%s:\n\n', this.constants.enter);

  // bumped body
  this.source += 
  this.section.text.map(function(item) {
    switch (item.type) {
      case 'syscall': 
        return self.trySyscall.apply(self, [syscall[item.name]].concat(item.args));
    }
  });

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
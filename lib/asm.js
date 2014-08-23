
var util = require('util');
var base = require('./base');
var addr = require('./addr');
var func = require('./func');
var syscall = require('./syscall');
var registers = require('./registers.json');

function asm() {
  if (!(this instanceof asm))
    return new asm();
  this.variablesTable = {};
  this.constants = {
    'enter': 'main'
  };
  this.section = {
    bss: [],
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

asm.prototype.decl = function(kind, opt) {
  var name = opt.id.name;
  var init = opt.init;
  if (kind === 'const' && init.type !== 'Literal')
    throw new Error('`const` must own literal declaration');

  this.variablesTable[name] = {
    initValue: init,
    type: typeof init.type
  };

  if (kind === 'const') {
    return this.section.text.push({
      type: 'declaration',
      args: [name, init]
    });
  }

  if (kind === 'var') {
    if (init.type === 'Literal') {
      var valType = typeof init.value;
      var valOffset;
      if (valType === 'number') {
        valOffset = 8;
      } else if (valType === 'string') {
        valOffset = 4;
      } else if (valType === 'bool') {
        valOffset = 2;  // for alignment
      }
    }
    console.log(name, init);
  }
}

asm.prototype.trySyscall = function(syscall, args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return syscall.apply(this, args).map(function(item) {
    return '  '+item;
  }).join('\n') + '\n\n';
}

asm.prototype.toString = function() {
  var self = this;
  this.source += 'section .bss\n\n';
  this.source += 'section .text\n\n';
  
  // define global variable
  this.source += util.format('global %s\n\n', this.constants.enter);
  
  // define main function
  this.source += util.format('%s:\n\n', this.constants.enter);
  this.source += func([], function() {
    // body
    var ret = self.section.text.map(function(item) {
      switch (item.type) {
        case 'syscall':
          return self.trySyscall.apply(self, [syscall[item.name]].concat(item.args));
        case 'declaration':
          return base.declaration.apply(self, item.args);
      }
    }).join('\n');

    // process exit()
    ret += self.trySyscall(syscall.exit, 0);
    return ret;
  });

  // declear .data section
  this.source += 'section .data\n\n';
  this.source += this.section.data.map(function(item) {
    return '  '+item;
  }).join('\n') + '\n\n';
  return this.source;
}

module.exports = asm;
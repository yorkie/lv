const util = require('util');
const base = require('./base');
const addr = require('./addr');
const func = require('./func');
const syscall = require('./syscall');
const instructs = require('./instructs');
const registers = require('./registers.json');
const types = require('./types/define');

class Assembly {
  constructor() {
    if (!(this instanceof Assembly))
      return new Assembly();
    this.variablesTable = {};
    this.constants = {
      'enter': 'main',
      'globalScope': 0,
      'stackSize': 25090 // keep consistent with v8
    };
    this.section = {
      bss: [],
      text: [],
      data: []
    };
    this.runtime = {
      'stack': {
        'offset': 0x00
      },
      'heap': {},
      'scope': this.constants.globalScope
    };
    this.source = '';
  }

  getSectionText() {
    return this.section.text;
  }

  getSectionData() {
    return this.section.data;
  }

  pushSyscall(name, args) {
    this.section.text.push({
      type: 'syscall',
      name: name,
      args: args
    });
  }

  decl(kind, opt) {
    var name = opt.id.name;
    var init = opt.init;
    if (kind === 'const') {
      if (init.type !== 'Literal')
        throw new Error('`const` must own literal declaration');
      if (this.runtime.scope !== this.constants.globalScope)
        throw new Error('`const` must be defined at global scope');
    }

    this.variablesTable[name] = {
      type: typeof init.type,
      scope: this.runtime.scope,
      initValue: init
    };

    this.section.text.push({
      type: 'declaration.'+kind,
      args: [name, init]
    });
  }

  trySyscall(syscall, args) {
    var args = Array.prototype.slice.call(arguments, 1);
    return '\n' + syscall.apply(this, args).map(function(item) {
      return '\t' + item;
    }).join('\n') + '\n\n';
  }

  toString() {
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
          case 'declaration.const':
            return base.declaration.apply(self, item.args);
          case 'declaration.var':
            return base.declaration2.apply(self, item.args);
        }
      }).join('\n')+'\n\n';

      // process exit()
      ret += self.trySyscall(syscall.exit, 0);
      return ret;
    });

    // declear .data section
    this.source += 'section .data\n\n';

    // added typing system define
    this.source += Object.keys(types).map(function(key) {
      return '\t' + '__sys__type_' + key + ': dd 0x' + types[key];
    }).join('\n') + '\n\n';

    // added variables and constants setup
    this.source += this.section.data.map(function(item) {
      return '\t'+item;
    }).join('\n') + '\n\n';
    return this.source;
  }
};

module.exports = Assembly;
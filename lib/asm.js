
var util = require('util');

function ASM() {
  this.init();
}

ASM.prototype.init = function() {
  this.constants = {
    enter: 'main'
  };
  this.section = {
    text: [],
    data: []
  };
  this.source = '';
}

ASM.prototype.getSectionText = function() {
  return this.section.text;
}

ASM.prototype.getSectionData = function() {
  return this.section.data;
}

ASM.prototype.toString = function() {
  this.source += 'section .text\n\n';
  this.source += util.format('global %s\n\n', this.constants.enter);
  this.source += util.format('%s:\n\n', this.constants.enter);
  
  this.source += 'section .data\n\n';
  for (var i=0; i<this.section.data.length; i++) {
    this.source += util.format('  %s db "%s", 0xa');
  }
  return this.source;
}
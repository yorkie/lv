
const assert = require('assert');
const util = require('util');
const addr = require('./addr');
const instructs = require('./instructs');
const registers = require('./registers.json');
const types = require('./types/define');

//
// for `const` declaration: const variable
//
exports.declaration = function(name, init) {
  assert.equal(init.type, 'Literal', 
    'const assignment must be `literal`');
  
  var rtype = typeof init.value;
  literal.call(this, name, init.value);
  this.variablesTable[name] = {
    type: rtype,
    isConstant: true,
    scope: this.runtime.scope,
    initValue: init
  };
  return '';
};

//
// helper for declaration
//
function literal(name, value) {
  var lenSymbol = name + '_len';
  var typeSymbol = name + '_type';
  if (typeof value === 'number') {
    this.section.data.push(instructs.db(name, value));
    this.section.data.push(instructs.db(typeSymbol, types['integer']));
  } else {
    this.section.data.push(instructs.db(name, value));
    this.section.data.push(instructs.equ(lenSymbol, '$-'+name));
    this.section.data.push(instructs.db(typeSymbol, types['string']));
  }
};

//
// for `var` declaration: local variable
//
exports.declaration2 = function(name, init) {
  // compute offset
  var offset = 0;
  var rtype = typeof init.value;
  if (init.type === 'Literal') {
    var size;
    if (rtype === 'string')
      size = name + '_len';
    else
      size = 1;

    literal.call(this, name, init.value);
    this.variablesTable[name] = {
      type: rtype,
      isConstant: false,
      scope: this.runtime.scope,
      initValue: init,
      accessor: name,
      size: size
    };
    return '';
  }
};


const util = require('util');
const assert = require('assert');

// mov eax, ebx
exports.byRegister = function(reg) {
  return reg;
};

// mov eax, 20
exports.byImmediate = function(pos) {
  assert.ok(pos > 0);
  return pos;
};

// mov eax, [2000h]
exports.byDirectMemory = function(pos) {
  assert.equal(typeof pos, 'number');
  return util.format('[%d]', pos);
};

// mov eax, [ebx+4]
exports.byDirectOffset = function(reg, pos) {
  assert.equal(typeof pos, 'number');
  if (pos >= 0)
    return util.format('[%s+%d]', reg, pos);
  else
    return util.format('[%s-%d]', reg, -pos);
};

// mov eax, [ebx]
exports.byIndirectRegister = function(reg) {
  return util.format('[%s]', reg);
};


var instructs = require('./instructs');
var registers = require('./registers.json');
var space = '  ';

/*
 * args: @array Arguments
 * progress: @function
 */
module.exports = function(args, progress) {
  if (typeof progress !== 'function') {
    throw new Error('functional progress required');
  }
  var ret = space+instructs.push(registers.EBP)+'\n';
  ret += space+instructs.mov(registers.EBP, registers.ESP)+'\n';
  ret += progress();
  ret += space+instructs.mov(registers.ESP, registers.EBP)+'\n';
  ret += space+instructs.pop(registers.EBP)+'\n';
  ret += space+instructs.ret()+'\n\n'
  return ret;
}
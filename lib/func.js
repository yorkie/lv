
var instructs = require('./instructs');
var registers = require('./registers.json');
var table = '\t';

/*
 * args: @array Arguments
 * progress: @function
 */
module.exports = function(args, progress) {
  if (typeof progress !== 'function')
    throw new Error('functional progress required');

  var ret = table+instructs.push(registers.EBP)+'\n';
  ret += table+instructs.mov(registers.EBP, registers.ESP)+'\n';
  ret += table+instructs.sub(registers.ESP, 10)+'\n';
  ret += progress();
  ret += table+instructs.mov(registers.ESP, registers.EBP)+'\n';
  ret += table+instructs.pop(registers.EBP)+'\n';
  ret += table+instructs.ret()+'\n\n'
  return ret;
}

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
  ret += progress();
  ret += space+instructs.pop(registers.EBP)+'\n\n';
  return ret;
}
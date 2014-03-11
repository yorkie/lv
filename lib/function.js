
var instructs = require('./instructs');
var registers = require('./registers.json');

/*
 * args: @array Arguments
 * progress: @function
 */
exports.func = function(args, progress) {
  if (typeof progress !== 'function') {
    throw new Error('functional progress required');
  }
  var ret = [
    instructs.push(registers.EBP)
  ];
  ret = ret.concat(progress());
  ret = ret.concat(registers.EBP);
  return ret;
}
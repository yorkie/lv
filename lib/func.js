
var instructs = require('./instructs');
var registers = require('./registers.json');
var createContext = require('./context').createContext;
var table = '\t';

module.exports = function(args, progress) {
  if (typeof progress !== 'function')
    throw new Error('functional progress required');

  var ctx = createContext();
  ctx.name = 'main_context';
  ctx.stacksize = 'large';
  ctx.text = progress();

  var ret = table+instructs.push(registers.EBP)+'\n';
  ret += table+instructs.mov(registers.EBP, registers.ESP)+'\n';
  ret += table+instructs.sub(registers.ESP, 10)+'\n';
  ret += ctx.toString();
  ret += table+instructs.mov(registers.ESP, registers.EBP)+'\n';
  ret += table+instructs.pop(registers.EBP)+'\n';
  ret += table+instructs.ret()+'\n\n';

  return ret;
};

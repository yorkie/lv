
const instructs = require('./instructs');
const registers = require('./registers.json');
const createContext = require('./context').createContext;
const table = '\t';

module.exports = function(args, progress) {
  if (typeof progress !== 'function')
    throw new Error('functional progress required');

  const ctx = createContext();
  ctx.name = 'main_context';
  ctx.stacksize = 'large';
  ctx.text = progress();

  let ret = table+instructs.push(registers.EBP)+'\n';
  ret += table+instructs.mov(registers.EBP, registers.ESP)+'\n';
  ret += table+instructs.sub(registers.ESP, 10)+'\n';
  ret += ctx.toString();
  ret += table+instructs.mov(registers.ESP, registers.EBP)+'\n';
  ret += table+instructs.pop(registers.EBP)+'\n';
  ret += table+instructs.ret()+'\n\n';

  return ret;
};

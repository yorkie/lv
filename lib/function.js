
var instructs = require('./instructs');
var registers = require('./registers.json');

exports.func = function(args, body) {
  var ret = [];
  ret.push(instructs.push(registers.EBP));
  // args TODO
  ret.push(instructs.pop(registers.EBP));
}
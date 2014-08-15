
var util = require('util');

exports.byDirect = function(addr) {
  // TODO
}

exports.byRegister = function(reg, pos) {
  if (pos > 0)
    return util.format('[%s+%d]', reg, pos);
  else if (pos < 0)
    return util.format('[%s-%d]', reg, -pos);
  else
    return reg;
}

exports.byRAM = function() {
  // TODO
}

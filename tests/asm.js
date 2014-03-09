
var fs = require('fs');
var path = require('path');
var asm = require('../lib/asm');

var tar = new asm();
fs.writeFile(path.join(__dirname, './asm-test.asm'), tar.toString(), function() {
  console.log('write successfully');
});
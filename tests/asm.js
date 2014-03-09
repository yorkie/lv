
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var asm = require('../lib/asm');

var tar = new asm();
fs.writeFile(path.join(__dirname, './asm-test.asm'), tar.toString(), function() {
  console.log('write successfully');
  var ch = exec('npm run asm');
  ch.stdout.pipe(process.stdout);
  ch.stderr.pipe(process.stderr);
});
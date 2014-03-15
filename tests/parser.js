
var fs = require('fs');
var path = require('path');
var Parser = require('../lib/parser');

var parser = new Parser('../examples/simple.js');

parser.on('error', function(err) {
  console.error(err);
})

parser.on('done', function(program) {
  fs.writeFile(path.join(__dirname, './parser-test.asm'), program);
});


var fs = require('fs');
var path = require('path');
var Parser = require('../lib/compiler/parser');

var src = fs.createReadStream(path.join(__dirname, '../examples/simple.js'));
var newparser = new Parser(src);

var esprima = require('esprima');
var fs = require('fs');
var path = require('path');
var util = require('util');

function parseText(content) {
  var esinfo = esprima.parse(content);
  console.log(esinfo);
}

function parseFile(filepath) {
  var realpath = path.join(__dirname, filepath);
  fs.readFile(realpath, 'utf8', function(err, content) {
    if (err) {
      return console.error(err);
    }
    parseText(content);
  })
}

exports.parseText = parseText;
exports.parseFile = parseFile;
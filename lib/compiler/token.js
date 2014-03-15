

var keywords = require('./keywords.json');

function Tokenizer(str) {
  this._buffer = str;
}

function tokenize(str) {
  return new Tokenizer(str);
}

module.exports = tokenize;
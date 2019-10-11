
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const asm = require('../lib/asm');

const tar = new asm();
const outputPath = path.join(__dirname, './outputs/asm-test')

fs.writeFile(outputPath, tar.toString(), function() {
  console.log('write successfully');
  const ch = exec(`sh build.sh ${outputPath}`);
  ch.stdout.pipe(process.stdout);
  ch.stderr.pipe(process.stderr);
});

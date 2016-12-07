"use strict";

var fs = require('fs');

var lines = dataFromFile('d7_data/test.txt');

function dataFromFile(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split('\n');
  return lines;
};

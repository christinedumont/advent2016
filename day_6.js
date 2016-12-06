"use strict";

var fs = require('fs');

var lines = dataFromFile('d6_data/puzzle.txt');
processLines(lines);

function processLines(lines) {
  var result = '';
  var arr = new Array(lines[0].length);
  for (var i=0; i<lines.length; i++) {
    var line = lines[i];
    if (line.length>0) {
      for (var j=0; j<line.length; j++) {
        if (arr[j]==undefined) arr[j] = '';
        arr[j] += line.charAt(j);
      }
    }
  }

  for (var k=0; k<arr.length; k++) {
    var sorted = arr[k].split('');
    sorted.sort((a,b) =>
        sorted.filter(v => v===b).length
        -sorted.filter(v => v===a).length
    ).pop();
    result += sorted[0];
  }

  console.log('Part one pass is: '+result);
};

function dataFromFile(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split('\n');
  return lines;
};

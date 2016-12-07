"use strict";

var utils = require('./utils/utils.js');
var lines = utils.dataFromFile('d6_data/puzzle.txt');

var result1 = '' , result2 = '';
var arr = new Array(lines[0].length);

// build array for each column
for (var i=0; i<lines.length; i++) {
  var line = lines[i];
  if (line.length>0) {
    for (var j=0; j<line.length; j++) {
      if (arr[j]==undefined) arr[j] = '';
      arr[j] += line.charAt(j);
    }
  }
}

// sorted each line by occurences
for (var k=0; k<arr.length; k++) {
  var sorted = arr[k].split('');
  sorted.sort((a,b) =>
      sorted.filter(v => v===b).length
      -sorted.filter(v => v===a).length
  );
  result1 += sorted[0];
  result2 += sorted[sorted.length-1];
}

console.log('Part one pass is: '+result1);
console.log('Part two pass is: '+result2);

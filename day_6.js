"use strict";

var fs = require('fs');

var lines = dataFromFile('d6_data/puzzle.txt');
processLines(lines);

function processLines(lines) {
  var arr = new Array(lines[0].length);
  for (var i=0; i<lines.length; i++) {
    var line = lines[i];
    for (var j=0; j<lines.length; j++) {
      arr[j] += line.charAt(j);
    }
  }
  var result = '';
  for (var k=0; k<arr.length; k++) {
    console.log(arr[k]+'\n\n');
    var str = arr[k];
    var sorted = str.match(/([a-z])\\1+/g);
	  sorted.sort(function(a, b){
		  return a.length> b.length? -1: 1;
	  });

    result += sorted[0];
  }

  console.log('Part one pass is: '+result);
};

function dataFromFile(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split('\n');
  return lines;
};

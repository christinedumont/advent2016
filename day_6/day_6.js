"use strict";

let utils = require('./../utils/utils.js');
let lines = utils.dataFromFile('d6_data/puzzle.txt');

let result1 = '' , result2 = '';
let arr = new Array(lines[0].length);

// build array for each column
for (let i=0; i<lines.length; i++) {
  let line = lines[i];
  if (line.length>0) {
    for (let j=0; j<line.length; j++) {
      if (arr[j]==undefined) arr[j] = '';
      arr[j] += line.charAt(j);
    }
  }
}

// sorted each line by occurences
for (let k=0; k<arr.length; k++) {
  let sorted = arr[k].split('');
  sorted.sort((a,b) =>
      sorted.filter(v => v===b).length
      -sorted.filter(v => v===a).length
  );
  result1 += sorted[0];
  result2 += sorted[sorted.length-1];
}

console.log('Part one pass is: '+result1);
console.log('Part two pass is: '+result2);

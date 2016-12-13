"use strict";

let utils = require('./../utils/utils.js');

console.log('Test');
let lines = utils.cleanedDataFromFile('d2_data/example.txt');
(codeForLines(lines, 1)=='1985') ? console.log('P1 Success!') : console.log('P1 Failure :(');
(codeForLines(lines, 2)=='5DB3') ? console.log('P2 Success!') : console.log('P2 Failure :(');

console.log('\n\nPuzzle');
lines = utils.cleanedDataFromFile('d2_data/puzzle.txt');
codeForLines(lines, 1);
codeForLines(lines, 2);

// example answer 1985

function codeForLines(lines, part) {
  let pos = '5';
  let code = '';

  for (let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i];
    for (let j=0, len2 = line.length; j < len2; j++) {
      let move = line.charAt(j);
      let npos = nextValue(pos, move, part);
      pos = npos;
    }
    code = code+pos;
  }
  console.log('part %s final code => '+code, part);
  return code;
}

function nextValue(currentValue, move, part) {
  if (part == 1) {
    /*
    1 2 3
    4 5 6
    7 8 9
    */
    if (currentValue == '1') {
      if (move == 'U') return '1';
      if (move == 'D') return '4';
      if (move == 'R') return '2';
      if (move == 'L') return '1';
    }
    if (currentValue=='2') {
      if (move == 'U') return '2';
      if (move == 'D') return '5';
      if (move == 'R') return '3';
      if (move == 'L') return '1';
    }
    if (currentValue=='3') {
      if (move == 'U') return '3';
      if (move == 'D') return '6';
      if (move == 'R') return '3';
      if (move == 'L') return '2';
    }
    if (currentValue=='4') {
      if (move == 'U') return '1';
      if (move == 'D') return '7';
      if (move == 'R') return '5';
      if (move == 'L') return '4';
    }
    if (currentValue=='5') {
      if (move == 'U') return '2';
      if (move == 'D') return '8';
      if (move == 'R') return '6';
      if (move == 'L') return '4';
    }
    if (currentValue=='6') {
      if (move == 'U') return '3';
      if (move == 'D') return '9';
      if (move == 'R') return '6';
      if (move == 'L') return '5';
    }
    if (currentValue=='7') {
      if (move == 'U') return '4';
      if (move == 'D') return '7';
      if (move == 'R') return '8';
      if (move == 'L') return '7';
    }
    if (currentValue=='8') {
      if (move == 'U') return '5';
      if (move == 'D') return '8';
      if (move == 'R') return '9';
      if (move == 'L') return '7';
    }
    if (currentValue=='9') {
      if (move == 'U') return '6';
      if (move == 'D') return '9';
      if (move == 'R') return '9';
      if (move == 'L') return '8';
    }
  }
  /*
      1
    2 3 4
  5 6 7 8 9
    A B C
      D
      */
  if (part == 2) {
    if (currentValue == '1') {
      if (move == 'U') return '1';
      if (move == 'D') return '3';
      if (move == 'R') return '1';
      if (move == 'L') return '1';
    }
    if (currentValue == '2') {
      if (move == 'U') return '2';
      if (move == 'D') return '6';
      if (move == 'R') return '3';
      if (move == 'L') return '2';
    }
    if (currentValue == '3') {
      if (move == 'U') return '1';
      if (move == 'D') return '7';
      if (move == 'R') return '4';
      if (move == 'L') return '2';
    }
    if (currentValue == '4') {
      if (move == 'U') return '4';
      if (move == 'D') return '8';
      if (move == 'R') return '4';
      if (move == 'L') return '3';
    }
    if (currentValue == '5') {
      if (move == 'U') return '5';
      if (move == 'D') return '5';
      if (move == 'R') return '6';
      if (move == 'L') return '5';
    }
    if (currentValue == '6') {
      if (move == 'U') return '2';
      if (move == 'D') return 'A';
      if (move == 'R') return '7';
      if (move == 'L') return '5';
    }
    if (currentValue == '7') {
      if (move == 'U') return '3';
      if (move == 'D') return 'B';
      if (move == 'R') return '8';
      if (move == 'L') return '6';
    }
    if (currentValue == '8') {
      if (move == 'U') return '4';
      if (move == 'D') return 'C';
      if (move == 'R') return '9';
      if (move == 'L') return '7';
    }
    if (currentValue == '9') {
      if (move == 'U') return '9';
      if (move == 'D') return '9';
      if (move == 'R') return '9';
      if (move == 'L') return '8';
    }
    if (currentValue == 'A') {
      if (move == 'U') return '6';
      if (move == 'D') return 'A';
      if (move == 'R') return 'B';
      if (move == 'L') return 'A';
    }
    if (currentValue == 'B') {
      if (move == 'U') return '7';
      if (move == 'D') return 'D';
      if (move == 'R') return 'C';
      if (move == 'L') return 'A';
    }
    if (currentValue == 'C') {
      if (move == 'U') return '8';
      if (move == 'D') return 'C';
      if (move == 'R') return 'C';
      if (move == 'L') return 'B';
    }
    if (currentValue == 'D') {
      if (move == 'U') return 'B';
      if (move == 'D') return 'D';
      if (move == 'R') return 'D';
      if (move == 'L') return 'D';
    }
  }
}

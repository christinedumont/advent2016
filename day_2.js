"use strict";

var fs = require('fs');

console.log('Test');
var lines = dataFromFile('d2_data/example.txt');
(codeForLines(lines, 1)=='1985') ? console.log('P1 Success!') : console.log('P1 Failure :(');
(codeForLines(lines, 2)=='5DB3') ? console.log('P2 Success!') : console.log('P2 Failure :(');

console.log('Puzzle');
var lines = dataFromFile('d2_data/puzzle.txt');
codeForLines(lines, 1);
codeForLines(lines, 2);

// example answer 1985

function codeForLines(lines, part) {
  var pos = '5';
  var code = '';

  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    for (var j=0, len2 = line.length; j < len2; j++) {
      var move = line.charAt(j);
      var npos = nextValue(pos, move, part);
      //console.log('line %s %s / move %s / pos %s / npos %s', i, line, move, pos, npos);
      pos = npos;
    }
    // end of line, print value
    //console.log('result for line['+(i+'')+'] is => '+pos)
    code = code+pos;
  }
  console.log('part %s final code => '+code, part);
  return code;
}

function dataFromFile(filename) {
  //console.log('Reading file:'+filename);
  var data = fs.readFileSync(filename, 'utf8');

  var lines = data.split('\n');
  //console.log('File got %s lines', lines.length);

  var cleanLines = [];
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    line = line.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

    if (line.length>0)
      cleanLines.push(line);
  }

  return cleanLines;
};

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

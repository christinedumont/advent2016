"use strict";

var fs = require('fs');

console.log('result for puzzle input is = '+computeBlocks('d1_data/input.txt', false));

function computeBlocks(filename, output) {
  var data = fs.readFileSync(filename, 'utf8');
  data = data.replace(/\s+/g, '');
  var arr = data.split(',');

  var foundAlreadyVisited = false;
  var x = 0;
  var y = 0;
  var currentDir = 'u';
  var allVisited = [];
  allVisited.push(x+':'+y);

  for (var i = 0, len = arr.length; i < len; i++) {

    var direction = arr[i].charAt(0);
    var displacement = parseInt(arr[i].substring(1, arr[i].length));
    var newdir = newDir(currentDir, direction);

    if (newdir=='r') {
      for (var j = 1; j <= displacement; j++) {
        var pos = (x+j) + ':' + y;
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      x+=displacement;
    } else if (newdir=='l') {
      for (var j = 1; j <= displacement; j++) {
        var pos = (x-j) + ':' + y;
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      x-=displacement;
    } else if (newdir=='u') {
      for (var j = 1; j <= displacement; j++) {
        var pos = x + ':' + (y+j);
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      y+=displacement;
    } else if (newdir=='d') {
      for (var j = 1; j <= displacement; j++) {
        var pos = x + ':' + (y-j);
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      y-=displacement;
    }

    currentDir = newdir;
  }

  return Math.abs(x) + Math.abs(y);
};

function checkForAlreadyVisited(arr, currentPos) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i]==currentPos) {
      console.log('Found already visited='+currentPos);
      return true;
    }
  }
  return false;
};

function newDir(currentDir, move) {
  if (currentDir == 'u') {
    if (move == 'R') return 'r';
    if (move == 'L') return 'l';
  }

  if (currentDir == 'd') {
    if (move == 'R') return 'l';
    if (move == 'L') return 'r';
  }

  if (currentDir == 'l') {
    if (move == 'R') return 'u';
    if (move == 'L') return 'd';
  }

  if (currentDir == 'r') {
    if (move == 'R') return 'd';
    if (move == 'L') return 'u';
  }
};

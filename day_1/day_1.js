"use strict";

let fs = require('fs');

console.log('result for puzzle input is: '+computeBlocks('d1_data/input.txt', false));

function computeBlocks(filename, output) {
  let data = fs.readFileSync(filename, 'utf8');
  data = data.replace(/\s+/g, '');
  let arr = data.split(',');

  let foundAlreadyVisited = false;
  let x = 0;
  let y = 0;
  let currentDir = 'u';
  let allVisited = [];
  allVisited.push(x+':'+y);

  for (let i = 0, len = arr.length; i < len; i++) {

    let direction = arr[i].charAt(0);
    let displacement = parseInt(arr[i].substring(1, arr[i].length));
    let newdir = newDir(currentDir, direction);

    if (newdir=='r') {
      for (let j = 1; j <= displacement; j++) {
        let pos = (x+j) + ':' + y;
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      x+=displacement;
    } else if (newdir=='l') {
      for (let j = 1; j <= displacement; j++) {
        let pos = (x-j) + ':' + y;
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      x-=displacement;
    } else if (newdir=='u') {
      for (let j = 1; j <= displacement; j++) {
        let pos = x + ':' + (y+j);
        if (!foundAlreadyVisited) {
          if (checkForAlreadyVisited(allVisited, pos)) foundAlreadyVisited=true;
        }
        allVisited.push(pos);
      }
      y+=displacement;
    } else if (newdir=='d') {
      for (let j = 1; j <= displacement; j++) {
        let pos = x + ':' + (y-j);
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
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i]==currentPos) {
      console.log('Found already visited: ('+currentPos.replace(':',', ')+')');
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

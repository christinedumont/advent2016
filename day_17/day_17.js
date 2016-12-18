"use strict";

let chalk = require('chalk');
let md5 = require('md5');

let utils = require('./../utils/utils.js');

/*
If your passcode were ihgpwlah, the shortest path would be DDRRRD.
With kglvqrro, the shortest path would be DDUDRLRRUDRD.
With ulqzkmiv, the shortest would be DRURDRUDDLLDLUURRDULRLDUUDDDRR.
*/

findPath('qljzarfv');


function findPath(input) {
  let state = {
    'room' : 1,
    'path' : ''
  };

  let validStates = [];
  let alreadyVisited = [];

  let possiblePaths = [];

while ((validStates.length != 0 || state)) {

    if (state.room == 16) {
      possiblePaths.push(state.path);

      state = validStates[0];
      validStates.shift();

    } else {
      alreadyVisited.push(hashForState(state));
      let hash = md5(input+state.path);

      let up = isDoorOpen(hash.charAt(0));
      let down = isDoorOpen(hash.charAt(1));
      let left = isDoorOpen(hash.charAt(2));
      let right = isDoorOpen(hash.charAt(3));

      if (up && state.room > 4) {
        let newState = stateForPos(state, 'U');
        if (!isAlreadyVisited(newState, alreadyVisited)) validStates.push(newState);
      }

      if (down && state.room < 13) {
        let newState = stateForPos(state, 'D');
        if (!isAlreadyVisited(newState, alreadyVisited)) validStates.push(newState);
      }

      if (left && (state.room != 1 && state.room != 5 && state.room != 9 && state.room != 13))  {
        let newState = stateForPos(state, 'L');
        if (!isAlreadyVisited(newState, alreadyVisited)) validStates.push(newState);
      }

      if (right && (state.room != 4 && state.room != 8 && state.room != 12 && state.room != 16))  {
        let newState = stateForPos(state, 'R');
        if (!isAlreadyVisited(newState, alreadyVisited)) validStates.push(newState);
      }
      state = validStates[0];
      validStates.shift();
    }
  }

  if (state && state.room == 16) {
    possiblePaths.push(state.path);
  }

  let l = findLonguest(possiblePaths);
  let s = findShortest(possiblePaths);

  console.log(chalk.blue('Answer P1 is: '+s+'\nAnswer P2 is: '+l.length));
}

function isDoorOpen(char) {
  const open = ['b','c','d','e','f'];
  for (let i=0; i<open.length; i++) {
    if (open[i]===char) return true;
  }
  return false;
}

function hashForState(state) {
  return state.room + '' + state.path;
}

function isAlreadyVisited(state, alreadyVisited) {
  for (let i=0; i<alreadyVisited.length; i++) {
    if (alreadyVisited === hashForState(state)) return true;
  }
  return false;
}

/*
#########
#S| | | #  1   2   3   4
#-#-#-#-#  5   6   7   8
# | | | #  9   10  11  12
#-#-#-#-#  13  14  15  16
# | | | #
#-#-#-#-#
# | | |
####### V
*/

// U , D, L, R


function stateForPos(state, move) {
  if (move=='U') {
    return stateForRoomAndPath(state.room-4, state.path+'U');
  } else if (move=='D') {
    return stateForRoomAndPath(state.room+4, state.path+'D');
  } else if (move=='L') {
    return stateForRoomAndPath(state.room-1, state.path+'L');
  } else if (move=='R') {
    return stateForRoomAndPath(state.room+1, state.path+'R');
  }
}

function stateForRoomAndPath(room, path) {
  return {
    'room' : room,
    'path' : path
  };
}

function findShortest(possiblePaths) {
  return possiblePaths.sort(function (a, b) { return a.length - b.length; })[0];
}

function findLonguest(possiblePaths) {
    return possiblePaths.sort(function (a, b) { return  b.length-a.length; })[0];
}

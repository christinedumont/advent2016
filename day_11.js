"use strict";

var chalk = require('chalk');

var currentState = {
  'floor' : 0,
  'distance' : 0,
  'pairs' : ['0:1', '0:2']
}
console.log('State: '+chalk.green(JSON.stringify(currentState)));

var moves = new Array();
var alreadyVisitedMoves = new Array();

moves = possibleMoves(currentState, alreadyVisitedMoves);
console.log(moves);
/*while (moves.length>0) {
  var move = moves.shift();
  var newState = cloneMove(move);

  if (move) {
    newState = cloneMove(move);
  }

  if (newState && isDone(newState)) {
    console.log('Min dist found for given input: '+newState.distance);
    break;
  } else {
    moves = moves.concat(possibleMoves(currentState, alreadyVisitedMoves));
  }
}*/

function possibleMoves(state, alreadyVisitedMoves) {
  var possibles = new Array();

  if (state.floor > 0) {
    // try go down
    var newMove = cloneMove(state);
    newMove.floor --;
    newMove.distance ++;

    var possiblePairsMove = pairsWithElemOnFloor(state.floor, newMove.pairs);


    /*if (isMoveLegal(newMove, alreadyVisitedMoves)) {
      possibles.push(newMove);
    }*/
  }

  if (state.floor < 3) {
    // try go up
    var newMove = cloneMove(state);
    newMove.floor ++;
    newMove.distance ++;

    var possiblePairsMove = pairsWithElemOnFloor(state.floor, newMove.pairs);
    // Single moves
    for (var i=0; i<possiblePairsMove.length; i++) {
      var possibleMove = cloneMove(newMove);
      var newPairs = cloneArray(possiblePairsMove);
      newPairs[i] = possiblePairsMove[i].replace(state.floor+'', newMove.floor+'');
      possibleMove.pairs = newPairs;
      if (isMoveLegal(possibleMove, alreadyVisitedMoves)) {
        possibles.push(possibleMove);
      }
    }

    // Double moves
    for (var i=0; i<possiblePairsMove.length; i++) {

    }


  }

  return possibles;
}

function isMoveLegal(move, aleadyVisitedMoves) {

  // Move is not legal if this move was aleady done
  var moveComp = move.floor+'|'+move.pairs;
  for (var i=0; i<alreadyVisitedMoves.length; i++) {
    if (moveComp == alreadyVisitedMoves[i]) return false;
  }



  // Move is not legal is something is getting fried
  var pairs = move.pairs;
  for (var i=0; i<pairs.length; i++) {
    var pair1 = pairs[i];
    for (var j=0; j<pairs.length; j++) {
      var pair2 = pairs[j];
      if (i!=j && pair1.split(':')[0] == pair2.split(':')[1]) return false;
    }
  }
  return true;
}

function pairsWithElemOnFloor(floor, pairs) {
  var goodPairs = new Array();
  for (var i=0; i<pairs.length; i++) {
    if (pairs[i].split(':')[0] == ''+floor || pairs[i].split(':')[1] == ''+floor) {
        goodPairs.push(pairs[i]);
    }
  }
  return goodPairs;
}

function addAlreadyVisited(state, aleadyVisitedMoves) {
  aleadyVisitedMoves.push(state.floor+'|'+state.pairs);
  return alreadyVisitedMoves;
}

function isDone(state) {
  for (var i=0; i<state.pairs.length; i++) {
    if (state.pairs[i] != '3:3') return false;
  }
  return true;
}

function cloneMove(move) {
  var clone = {
    'floor' : move.floor,
    'distance' : move.distance,
    'pairs' : cloneArray(move.pairs)
  }
  return clone;
}

function cloneArray(array) {
  return array.map(function(arr) {
    return arr.slice();
  });
}



/*

const maxData = 4;
var testData = [['E', 'HM', 'LM'],['HG'],['LG'],[]];
var puzzleData = [['E', 'SG', 'SM', 'PG', 'PM'],['RG', 'RM', 'CG', 'CM', 'TG'],['TM'],[]];

move(testData, 0);
function move(testData, currentMoves) {
  if (testData[3].length == maxData+1) {
    console.log(chalk.yellow('Found possible path with ')+chalk.red(currentMoves)+chalk.yellow(' moves'));
    return;
  } else {
    var currentMove = copy(testData);
    var moves = possibleMoves(testData);
    console.log(chalk.magenta(JSON.stringify(moves)));
    console.log(currentMoves);
    if (currentMoves<=1) {
      for (var i=0; i<moves.length; i++) {
        console.log(chalk.blue(JSON.stringify(moves[i])));
        move(moves[i], currentMoves+1);
      }
    }
  }
}

function possibleMoves(testData) {
  var possibles = new Array();
  for (var i=0; i<4; i++) {
    // Find elevator first
    if (testData[i].indexOf('E') != -1) {
      var testDataCopy = copy(testData);

      // Remove elevator
      testDataCopy[i].shift();

      // list items on floor and create pairs with those items
      var itemsOnFloor = testDataCopy[i];
      var allPairs = pairs(itemsOnFloor);
      if (i<3) {
        // we can only got up, let's try with all pairs
        for (var j=0; j<allPairs.length; j++) {
          var newLine = copy(testData[i+1]);
          newLine.push(allPairs[j][0]);
          newLine.push(allPairs[j][1]);

          if (!isFried(newLine)) {
            newLine.unshift('E');

            var newArr = copy(testDataCopy);
            newArr[i].splice(j, 1);
            newArr[i+1] = newLine;
            possibles.push(newArr);
          }
        }

        // we also new to try with single items
        for (var j=0; j<itemsOnFloor.length; j++) {
          var newLine = copy(testData[i+1]);
          newLine.push(itemsOnFloor[j]);

          if (!isFried(newLine)) {
            newLine.unshift('E');

            var newArr = copy(testDataCopy);
            newArr[i].splice(j, 1);
            newArr[i+1] = newLine;
            possibles.push(newArr);
          }
        }
      }

      if (i>0) {
        // we can only got up, let's try with all pairs
        for (var j=0; j<allPairs.length; j++) {
          var newLine = copy(testData[i-1]);
          newLine.push(allPairs[j][0]);
          newLine.push(allPairs[j][1]);

          if (!isFried(newLine)) {
            newLine.unshift('E');

            var newArr = copy(testDataCopy);
            newArr[i].splice(j, 1);
            newArr[i-1] = newLine;
            possibles.push(newArr);
          }
        }

        // we also new to try with single items
        for (var j=0; j<itemsOnFloor.length; j++) {
          var newLine = copy(testData[i-1]);
          newLine.push(itemsOnFloor[j]);

          if (!isFried(newLine)) {
            newLine.unshift('E');

            var newArr = copy(testDataCopy);
            newArr[i].splice(j, 1);
            newArr[i-1] = newLine;
            possibles.push(newArr);
          }
        }
      }

      break;
    }
  }
  return possibles;
}

function isFried(line) {
  for (var i=0; i<line.length; i++) {
    if (line[i].charAt(1)=='G') {
      // We got a generator, those are the dangerous one, generator can't be alone with another mchip
      var type = line[i].charAt(0);
      for (var j=0; j<line.length; j++) {
        if (line[j].charAt(0) != type && line[j].charAt(1)=='M') {
          return true;
        }
      }
    }
  }
  return false;
}

function pairs(arr) {
  var res = [], l = arr.length;
  for(var i=0; i<l; ++i)
    for(var j=i+1; j<l; ++j)
      res.push([arr[i], arr[j]]);

  return res;
}



*/

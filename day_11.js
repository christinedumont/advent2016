"use strict";

var chalk = require('chalk');

const maxData = 4;
var testData = [['E', 'HM', 'LM'],['HG'],['LG'],[]];
var puzzleData = [['E', 'SG', 'SM', 'PG', 'PM'],['RG', 'RM', 'CG', 'CM', 'TG'],['TM'],[]];

move(testData, 0);
function move(testData, currentMoves) {
  if (testData[3].length == maxData+1) {
    console.log(chalk.yellow('Found possible path with ')+chalk.red(currentMoves)+chalk.yellow(' moves'));
    return;
  } else {
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

function copy(current) {
  return current.map(function(arr) {
    return arr.slice();
  });
}

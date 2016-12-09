"use strict";

var chalk = require('chalk');
var logUpdate = require('log-update');
var arrayRotation = require('npm-array-rotation');

var utils = require('./utils/utils.js');

var lines = utils.dataFromFile('d8_data/puzzle.txt');
solve(lines, true);

function solve(lines, display) {
  var screen = initSmallScreen();

  for (var i=0; i<lines.length; i++) {
    if (lines[i].trim().length > 0) {
      if (display) {
        utils.sleep(100, function() {
          processLine(lines[i], screen);
          displaySmallScreen(screen, i==lines.length-2);
        });
      } else {
        processLine(lines[i], screen);
      }
    }
  }
  console.log('Part one :: Total lit pixels: ' + findTotal(screen))
}

function findTotal(screen) {
  var total = 0;
  for (var i=0; i<6; i++) {
    for (var j=0; j<50; j++) {
      if (screen[i][j]=='#') total ++;
    }
  }
  return total;
}

function processLine(line, screen) {
  if (line.startsWith('rect')) {
    var numbers = line.split(' ')[1].split('x');
    rect(screen, parseInt(numbers[0]), parseInt(numbers[1]));
  } else if (line.startsWith('rotate column')) {
    var spl  = line.split(' ');
    rotCol(screen, parseInt(spl[2].split('=')[1]), parseInt(spl[4]));
  } else if (line.startsWith('rotate row')) {
    var spl  = line.split(' ');
    rotRow(screen, parseInt(spl[2].split('=')[1]), parseInt(spl[4]));
  } else {
    console.log('unhandled line: '+line);
  }
}

function rect(screen, x, y) {
  for (var i=0; i<x; i++) {
    for (var j=0; j<y; j++) {
      screen[j][i] = '#';
    }
  }
}

function rotRow(screen, idx, shift) {
  screen[idx] = arrayRotation.rotateRight(screen[idx], shift);
}

function rotCol(screen, idx, shift) {
  var col = [];
  for (var i=0; i<6; i++) {
    col.push(screen[i][idx]);
  }
  col = arrayRotation.rotateRight(col, shift);

  for (var i=0; i<6; i++) {
    screen[i][idx] = col[i];
  }
}

function initSmallScreen() {
  var smallScreen = new Array(6);
  for (var i=0; i<smallScreen.length; i++) {
    smallScreen[i] = new Array(50);
    for (var j=0; j<smallScreen[i].length; j++) {
      smallScreen[i][j] = '.';
    }
  }
  return smallScreen;
}

function displaySmallScreen(screen, last) {
  var screenString = '';

  for (var i=0; i<screen.length; i++) {
    var line = screen[i];
    for (var j=0; j<line.length; j++) {
      if (line[j]=='.') {
        screenString += chalk.green.bgGreen('●');
      } else {
        if (!last)
          screenString += randColor('●');
        else
          screenString += chalk.white.bgBlack('●');
      }
    }
    screenString += '\n';
  }

  logUpdate(screenString);
}

function randColor(str) {
  var colorArr = [chalk.white.bgYellow(str), chalk.white.bgBlue(str), chalk.white.bgRed(str), chalk.white.bgCyan(str), chalk.white.bgMagenta(str)];
  colorArr.sort(function() {
  return .5 - Math.random();
  });

  return colorArr[0];
}

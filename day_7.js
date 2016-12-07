"use strict";

var chalk = require('chalk');
var utils = require('./utils/utils.js');

const error = chalk.bold.bgRed;
const validLine = chalk.green;
const invalidLine = chalk.red;

var lines = utils.dataFromFile('d7_data/puzzle.txt');
solve(lines);

function solve(lines) {
  var resultTLS = 0;
  var resultSSL = 0;
  for (var i=0; i<lines.length; i++) {
    if (lines[i].trim().length > 0) {
      if (supportTLS(lines[i])) resultTLS +=1;
      if (supportSSL(lines[i])) resultSSL +=1;
    }
  }
  console.log('Total valid TLS addresses: '+resultTLS);
  console.log('Total valid SSL addresses: '+resultSSL);
};

function supportTLS(line) {
  var cleanLine = line.toLowerCase().trim();
  var parts = cleanLine.split(/[\[\]]+/);
  var potentiallyValid = false;
  for (var i=0; i<parts.length; i++) {
    if (i%2) {
      // inside brackets, will invalidate
      if (containsABBA(parts[i])) {
        potentiallyValid = false;
        break;
      }
    } else {
      if (containsABBA(parts[i])) {
        potentiallyValid = true;
      }
    }
  }

  if (potentiallyValid) {
    //console.log('Valid '+validLine(cleanLine));
    return true;
  }

  //console.log('Invalid '+invalidLine(cleanLine));
  return false;
}

function supportSSL(line) {
  var cleanLine = line.toLowerCase().trim();
  var parts = cleanLine.split(/[\[\]]+/);

  var aba = new Array();
  var bab = new Array();
  for (var i=0; i<parts.length; i++) {
    if (!(i%2)) {
      // outside brackets, search for ABA
      aba = aba.concat(findCharSeq(parts[i]));
    } else {
      bab = bab.concat(findCharSeq(parts[i]));
    }
  }
  for (var j=0; j<aba.length; j++) {
    var curr = aba[j];
    var currBAB = curr.charAt(1)+curr.charAt(0)+curr.charAt(1);
    if (bab.indexOf(currBAB)!=-1) {
      //console.log('Valid '+validLine(cleanLine));
      return true;
    }
  }

  //console.log('Invalid '+invalidLine(cleanLine));
  return false;
}

function containsABBA(chunk) {
  var lastChar = '';
  for (var i=1; i<chunk.length; i++) {
    var curChar = chunk.charAt(i);
    if (lastChar != '' && lastChar==curChar) {
      if (chunk.charAt(i+1)==chunk.charAt(i-2) && chunk.charAt(i+1)!=curChar)
        return true;
    }
    lastChar = curChar;
  }
  return false;
}

function findCharSeq(chunk) {
  var aba  = new Array();
  for (var i=0; i<chunk.length; i++) {
    var curChar = chunk.charAt(i);
    var prev = chunk.charAt(i-1);
    var next = chunk.charAt(i+1);

    if (prev && next && prev==next) {
      aba.push(prev+curChar+next);
    }
  }
  return aba;
}

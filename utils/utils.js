"use strict";

module.exports.dataFromFile = function(filename) {
  var data = require('fs').readFileSync(filename, 'utf8');
  var lines = data.split('\n');
  return lines;
};

module.exports.cleanedDataFromFile = function(filename) {
  var data = require('fs').readFileSync(filename, 'utf8');
  var lines = data.split('\n');

  var cleanLines = [];
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    line = line.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

    if (line.length>0)
      cleanLines.push(line);
  }

  return cleanLines;
};

module.exports.isArrayFull = function(arr) {
   return arr.length === arr.filter(function(o) {
     return typeof o !== 'undefined' ||  o !== null;
   }).length;
}

module.exports.printArrayPretty = function(arr) {
  var str = '';
  for (var i=0;i<arr.length; i++) {
    if (arr[i]==undefined) {
      str += '_';
    } else {
      str += arr[i];
    }
  }
  console.log(str);
}

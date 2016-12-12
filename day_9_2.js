"use strict";

var Promise = require('bluebird');

var chalk = require('chalk');
var utils = require('./utils/utils.js');

var data = utils.dataFromFile('d9_data/puzzle.txt')[0];
const markerRegex = /\(+(.+?)\)/;

var resultLen = 0;
var resultStr = data;

while (resultStr.length > 0) {
  var data = resultStr;
  var nextMarker = markerRegex.exec(data);
  if (nextMarker) {
    var beforeMarker = data.substr(0, nextMarker.index);
    var marker = data.substr(nextMarker.index, nextMarker[0].length);
    var afterMarker = data.substr(nextMarker.index+nextMarker[0].length, data.length);

    resultLen += beforeMarker.length;

    var markerTarget = parseInt(nextMarker[1].split('x')[0]);
    var markerRepeat = parseInt(nextMarker[1].split('x')[1]);

    var toProcess = afterMarker.substring(0, markerTarget);
    var markerResult = toProcess.repeat(markerRepeat);

    var remaining = afterMarker.substring(markerTarget, data.length);
    resultStr = markerResult + remaining;
  } else {
    resultLen += data.length;
    resultStr = '';
  }
}

console.log('P2 result:'+resultLen);

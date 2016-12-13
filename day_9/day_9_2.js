"use strict";

let Promise = require('bluebird');

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

let data = utils.dataFromFile('d9_data/puzzle.txt')[0];
const markerRegex = /\(+(.+?)\)/;

let resultLen = 0;
let resultStr = data;

while (resultStr.length > 0) {
  let data = resultStr;
  let nextMarker = markerRegex.exec(data);
  if (nextMarker) {
    let beforeMarker = data.substr(0, nextMarker.index);
    let marker = data.substr(nextMarker.index, nextMarker[0].length);
    let afterMarker = data.substr(nextMarker.index+nextMarker[0].length, data.length);

    resultLen += beforeMarker.length;

    let markerTarget = parseInt(nextMarker[1].split('x')[0]);
    let markerRepeat = parseInt(nextMarker[1].split('x')[1]);

    let toProcess = afterMarker.substring(0, markerTarget);
    let markerResult = toProcess.repeat(markerRepeat);

    let remaining = afterMarker.substring(markerTarget, data.length);
    resultStr = markerResult + remaining;
  } else {
    resultLen += data.length;
    resultStr = '';
  }
}

console.log('P2 result:'+resultLen);

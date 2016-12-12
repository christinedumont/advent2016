"use strict";

var chalk = require('chalk');
var utils = require('./utils/utils.js');

var data = utils.dataFromFile('d9_data/puzzle.txt')[0];
solveP1(data);

function solveP1(data) {
  const markerRegex = /\(+(.+?)\)/;
  var decompressed = '';
  while (data.length != 0)
  {
    var nextMarker = markerRegex.exec(data);
    if (nextMarker) {
        var beforeMarker = data.substr(0, nextMarker.index);
        var marker = data.substr(nextMarker.index, nextMarker[0].length);
        var afterMarker = data.substr(nextMarker.index+nextMarker[0].length, data.length);

        decompressed += beforeMarker;

        var markerTarget = parseInt(nextMarker[1].split('x')[0]);
        var markerRepeat = parseInt(nextMarker[1].split('x')[1]);

        var toProcess = afterMarker.substring(0, markerTarget);
        decompressed += toProcess.repeat(markerRepeat);
        data = afterMarker.substring(markerTarget, data.length);
    } else {
      decompressed += data;
      data = '';
    }
  }

  decompressed = decompressed.trim();
  console.log('Result P1 :: Decompressed length: '+decompressed.length);
}

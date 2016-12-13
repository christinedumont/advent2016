"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

let data = utils.dataFromFile('d9_data/puzzle.txt')[0];
solveP1(data);

function solveP1(data) {
  const markerRegex = /\(+(.+?)\)/;
  let decompressed = '';
  while (data.length != 0)
  {
    let nextMarker = markerRegex.exec(data);
    if (nextMarker) {
        let beforeMarker = data.substr(0, nextMarker.index);
        let marker = data.substr(nextMarker.index, nextMarker[0].length);
        let afterMarker = data.substr(nextMarker.index+nextMarker[0].length, data.length);

        decompressed += beforeMarker;

        let markerTarget = parseInt(nextMarker[1].split('x')[0]);
        let markerRepeat = parseInt(nextMarker[1].split('x')[1]);

        let toProcess = afterMarker.substring(0, markerTarget);
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

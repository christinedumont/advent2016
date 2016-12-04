"use strict";

var fs = require('fs');

var lines = dataFromFile('d3_data/puzzle.txt');
validateTrianglesP1(lines);
validateTrianglesP2(lines);

function validateTrianglesP1(lines) {

  var totalValids = 0;
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    if (line.trim().length!=0) {
      var valuesArr = line.split(' ');
      var cleanValues = [];
      for (var j = 0, len2 = valuesArr.length; j < len2; j++) {
        if (parseInt(valuesArr[j])) {
          cleanValues.push(parseInt(valuesArr[j]));
        }
      }

      cleanValues = cleanValues.sort((a, b) => a - b);
      if (cleanValues[0]+cleanValues[1]>cleanValues[2]) {
        totalValids ++;
      }
    }
  }

  console.log('P1 :: Total valid triangles = '+totalValids);
};

function validateTrianglesP2(lines) {
  var totalValids = 0;

  for (var i = 0, len = lines.length; i < len; i+=3) {
    var line1 = lines[i];
    var line2 = lines[i+1];
    var line3 = lines[i+2];

    if (line1.trim().length!=0 && line2.trim().length!=0 && line3.trim().length!=0) {
      var line1split = line1.split(' ');
      var line2split = line2.split(' ');
      var line3split = line3.split(' ');

      var cleanValues1 = [];
      for (var j = 0, len2 = line1split.length; j < len2; j++) {
        if (parseInt(line1split[j])) {
          cleanValues1.push(parseInt(line1split[j]));
        }
      }

      var cleanValues2 = [];
      for (var j = 0, len2 = line2split.length; j < len2; j++) {
        if (parseInt(line2split[j])) {
          cleanValues2.push(parseInt(line2split[j]));
        }
      }

      var cleanValues3 = [];
      for (var j = 0, len2 = line3split.length; j < len2; j++) {
        if (parseInt(line3split[j])) {
          cleanValues3.push(parseInt(line3split[j]));
        }
      }

      var triangle1 = [cleanValues1[0], cleanValues2[0], cleanValues3[0]];
      var triangle2 = [cleanValues1[1], cleanValues2[1], cleanValues3[1]];
      var triangle3 = [cleanValues1[2], cleanValues2[2], cleanValues3[2]];

      triangle1 = triangle1.sort((a, b) => a - b);
      triangle2 = triangle2.sort((a, b) => a - b);
      triangle3 = triangle3.sort((a, b) => a - b);

      if (triangle1[0]+triangle1[1]>triangle1[2]) {
        totalValids ++;
      }

      if (triangle2[0]+triangle2[1]>triangle2[2]) {
        totalValids ++;
      }

      if (triangle3[0]+triangle3[1]>triangle3[2]) {
        totalValids ++;
      }

    }
  }

  console.log('P2 :: Total valid triangles = '+totalValids);
};


function dataFromFile(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split('\n');
  return lines;
};

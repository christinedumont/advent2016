"use strict";

let utils = require('./../utils/utils.js');

let lines = utils.dataFromFile('d3_data/puzzle.txt');
validateTrianglesP1(lines);
validateTrianglesP2(lines);

function validateTrianglesP1(lines) {

  let totalValids = 0;
  for (let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i];
    if (line.trim().length!=0) {
      let valuesArr = line.split(' ');
      let cleanValues = [];
      for (let j = 0, len2 = valuesArr.length; j < len2; j++) {
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
  let totalValids = 0;

  for (let i = 0, len = lines.length; i < len; i+=3) {
    let line1 = lines[i];
    let line2 = lines[i+1];
    let line3 = lines[i+2];

    if (line1.trim().length!=0 && line2.trim().length!=0 && line3.trim().length!=0) {
      let line1split = line1.split(' ');
      let line2split = line2.split(' ');
      let line3split = line3.split(' ');

      let cleanValues1 = [];
      for (let j = 0, len2 = line1split.length; j < len2; j++) {
        if (parseInt(line1split[j])) {
          cleanValues1.push(parseInt(line1split[j]));
        }
      }

      let cleanValues2 = [];
      for (let j = 0, len2 = line2split.length; j < len2; j++) {
        if (parseInt(line2split[j])) {
          cleanValues2.push(parseInt(line2split[j]));
        }
      }

      let cleanValues3 = [];
      for (let j = 0, len2 = line3split.length; j < len2; j++) {
        if (parseInt(line3split[j])) {
          cleanValues3.push(parseInt(line3split[j]));
        }
      }

      let triangle1 = [cleanValues1[0], cleanValues2[0], cleanValues3[0]];
      let triangle2 = [cleanValues1[1], cleanValues2[1], cleanValues3[1]];
      let triangle3 = [cleanValues1[2], cleanValues2[2], cleanValues3[2]];

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

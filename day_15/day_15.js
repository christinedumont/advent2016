"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

console.time("execute1");
getCapsule(setupFromLines(utils.dataFromFile('d15_data/puzzle.txt')), false);
console.timeEnd("execute1");

console.time("execute2");
getCapsule(setupFromLines(utils.dataFromFile('d15_data/puzzle.txt')), true);
console.timeEnd("execute2");

function getCapsule(discs, part2) {
  let discPosForTime = [];

  if (part2) {
    discs.push({
      'nbPos' : 11,
      'initPos': 0
    });
  }

  let time = 0;

  do
  {
    discPosForTime = [];

    for (let i=0; i<discs.length; i++) {

      let timeForDisc = time+(i+1);

      let currDisc = discs[i];
      let initialPos = currDisc.initPos;
      let nbPos = currDisc.nbPos;

      let currentPos = (initialPos + timeForDisc) % nbPos;
      discPosForTime.push(currentPos);

    }
    time ++;

  } while (!allZeros(discPosForTime));

  if (!part2) console.log(chalk.magenta('P1 :: Capsule will fall if button is pushed at time: ' + (time-1)));
  else console.log(chalk.green('P2 :: Capsule will fall if button is pushed at time: ' + (time-1)));
}

function allZeros(arr) {
  for (let i=0; i<arr.length; i++) {
    if (arr[i] !== 0) {
      return false;
    }
  }
  return true;
}

function setupFromLines(lines) {
  let discsArray = [];
  for (let i=0; i<lines.length; i++) {
    if (lines[i].trim().length>0) {

      let nums = lines[i].match(/[0-9]+/g);

      let disc = {
        'nbPos' : parseInt(nums[1]),
        'initPos': parseInt(nums[3])
      };
      discsArray.push(disc);
    }
  }
  return discsArray;
}

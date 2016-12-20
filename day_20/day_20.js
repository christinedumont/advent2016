"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

const lines = utils.dataFromFile('d20_data/puzzle.txt');
const max = 4294967295;

//const lines = ['5-8','0-2','4-7', ''];
//const max = 9;

let numberArray = [];
for (let i=0; i<lines.length; i++) {
  let line = lines[i];
  if (line.trim().length>0) {
    let tokens = line.split('-');
    numberArray.push(minMaxObj(tokens[0], tokens[1]));
  }
}

let totalValids = 0;
for (let i=0; i<max; i++) {
  let invalid = false;
  let idx = 0;
  do {
    let minMax = numberArray[idx];
    if (i>= minMax.min && i<= minMax.max) {
      invalid = true;
    }
  //  console.log('i:'+i+' minMax.min:'+minMax.min+' minMax.max:'+minMax.max);
    idx ++;
  } while (idx<numberArray.length && !invalid)

  if (!invalid) {
    console.log(chalk.green('Found valid number: ')+chalk.blue(i+''));
    totalValids ++;
  }
}

console.log(chalk.green('-------------------------------'));
console.log(chalk.green('Total valids IPs: ')+chalk.blue(totalValids+''));

function minMaxObj(token1, token2) {
  return {
    'min' : parseInt(token1),
    'max' : parseInt(token2)
  };
}

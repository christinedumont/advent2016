"use strict";

let chalk = require('chalk');
let logUpdate = require('log-update');

const testInput1 = 5;
const testInput2 = 10;
const input = 3001330; //1407007

console.time("Time to distribute");
presentsParty(input);
console.timeEnd("Time to distribute");

function presentsParty(input) {

  console.log(chalk.red('Will exchange presents for '+input+' elfs.'));
  let elfs = buildElfList(input);
  let currentIdx = 0;

  do {

    let l = elfs.length;
    if (currentIdx>=l)
      currentIdx = 0;

    // Find elf accross
    let accrossIdx = Math.floor((l/2)+currentIdx);
    if (accrossIdx>=l) accrossIdx = accrossIdx-l;

    elfs.splice(accrossIdx,1);

    if (accrossIdx>currentIdx)
      currentIdx ++;

//    logUpdate(chalk.yellow(elfs.length)+chalk.magenta(' elfs left'));

  } while (elfs.length != 1);

  console.log(chalk.green('\nWinning elf is : '+JSON.stringify(elfs)));
}

function buildElfList(input) {
  let elfs = [];
  for (let i=0; i<input; i++) {
    let elf = {'id' : i+1};
    elfs.push(elf);
  }
  return elfs;
}

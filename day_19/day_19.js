"use strict";

let chalk = require('chalk');

const testInput = 5;
const input = 3001330; //1808357

console.time("Time to distribute");
presentsParty(testInput);
console.timeEnd("Time to distribute");

function presentsParty(input) {
  console.log(chalk.red('Will exchange presents for '+input+' elfs.'));

  let elfs = buildElfList(input);
  do {

    console.time("Time for round");
    for (let i=0; i < elfs.length; ++i) {
      if (elfs[i].presents === 0) {
        elfs.splice(i, 1); // Remove elf without present
        --i; // Correct the index value
      } else if (elfs.length>1) {
        let elf1 = elfs[i];
        let elf2 = (i+1 == elfs.length) ? elfs[0] : elfs[i+1];

        elf1.presents = elf1.presents + elf2.presents;
        elf2.presents = 0;
      }
    }

    console.log(chalk.magenta(elfs.length)+chalk.yellow(' elfs left in circle.'));
    console.timeEnd("Time for round");

  } while (elfs.length != 1);

  console.log(chalk.green('Winning elf is : '+JSON.stringify(elfs)));
}

function buildElfList(input) {
  let elfs = [];
  for (let i=0; i<input; i++) {
    let elf = {
      'id' : i+1,
      'presents' : 1
    };
    elfs.push(elf);
  }
  return elfs;
}

"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

let lines = utils.dataFromFile('d12_data/puzzle.txt');

let registers = {};
console.log(chalk.magenta('P1 answer: ')+chalk.green(JSON.stringify(solve(lines, registers))));

let registers2 = {'c':1};
console.log(chalk.magenta('P2 answer: ')+chalk.green(JSON.stringify(solve(lines, registers2))));

function solve(lines, data) {
  for (let i=0; i<lines.length; i++) {
    if (lines[i].trim().length>0) {
      let tokens = lines[i].split(' ');
      if (tokens[0] == 'cpy') {
        let register = tokens[2];
        if (!data[register]) {
          data[register] = 0;
        }
        let val = tokens[1];
        if (!isNaN(val)) {
          data[register] = parseInt(val);
        } else {
          // val is another register
          data[register] = data[val];
        }
      } else if (tokens[0] == 'inc') {
        data[tokens[1]] ++;
      } else if (tokens[0] == 'dec') {
        data[tokens[1]] --;
      } else if (tokens[0] == 'jnz') {
        if ((!isNaN(tokens[1]) && parseInt(tokens[0]) != 0) || (data[tokens[1]] && data[tokens[1]] != 0)) {
            i += parseInt(tokens[2])-1;
        }
      }
    }
  }
  return data;
}

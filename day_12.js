"use strict";

var chalk = require('chalk');
var logUpdate = require('log-update');
var utils = require('./utils/utils.js');

var lines = utils.dataFromFile('d12_data/puzzle.txt');

var registers = {};

/**
cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a
*/
for (var i=0; i<lines.length; i++) {
  if (lines[i].trim().length>0) {
    var tokens = lines[i].split(' ');
    if (tokens[0] == 'cpy') {
      var register = tokens[2];
      if (!registers[register]) {
        registers[register] = 0;
      }
      registers[register] = parseInt(tokens[1]);
      console.log(registers);
    } else if (tokens[0] == 'inc') {
      registers[tokens[1]] ++;
    } else if (tokens[0] == 'dec') {
      registers[tokens[1]] --;
    } else if (tokens[0] == 'jnz') {
      var register = registers[tokens[1]];
      if (register && register != 0) {
        i += parseInt(tokens[2])-1;
      }
    }
  }

  //logUpdate(chalk.blue(JSON.stringify(registers)));
}

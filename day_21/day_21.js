"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

/*
const input = 'abcdefgh';
const instructions = utils.dataFromFile('d22_data/puzzle.txt');
*/

const input = 'abcde';
const instructions = utils.dataFromFile('d21_data/test.txt');
unscramble(input, instructions);

function unscramble(input, instructions) {

  let result = input;
  for (let i=0; i<instructions.length; i++) {
    let instruction = instructions[i];
    if (instruction.trim().length>0) {

      // Possible instructions starts
      if (instruction.startsWith('swap position')) {
        let matches = instruction.match(/\d+/g);

        let pos1 = parseInt(matches[0]);
        let pos2 = parseInt(matches[1]);

        let char1 = result.charAt(pos1);
        let char2 = result.charAt(pos2);

        result = setCharAt(result, pos1, char2);
        result = setCharAt(result, pos2, char1)

      } else if (instruction.startsWith('swap letter')) {
        let tokens = instruction.split(' ');

        let char1 = tokens[2];
        let char2 = tokens[5];

        let pos1 = result.indexOf(char1);
        let pos2 = result.indexOf(char2);

        result = setCharAt(result, pos1, char2);
        result = setCharAt(result, pos2, char1)

      } else if (instruction.startsWith('reverse')) {

      } else if (instruction.startsWith('rotate based')) {

      } else if (instruction.startsWith('rotate')) {

      } else if (instruction.startsWith('move position')) {

      }

    }
  }

  console.log(chalk.green('Final password is: ')+result);
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}


/**

swap position 4 with position 0 swaps the first and last letters, producing the input for the next step, ebcda.
swap letter d with letter b swaps the positions of d and b: edcba.
reverse positions 0 through 4 causes the entire string to be reversed, producing abcde.
rotate left 1 step shifts all letters left one position, causing the first letter to wrap to the end of the string: bcdea.
move position 1 to position 4 removes the letter at position 1 (c), then inserts it at position 4 (the end of the string): bdeac.
move position 3 to position 0 removes the letter at position 3 (a), then inserts it at position 0 (the front of the string): abdec.
rotate based on position of letter b finds the index of letter b (1), then rotates the string right once plus a number of times equal to that index (2): ecabd.
rotate based on position of letter d finds the index of letter d (4), then rotates the string right once, plus a number of times equal to that index, plus an additional time because the index was at least 4, for a total of 6 right rotations: decab.
After these steps, the resulting scrambled password is decab.


*/

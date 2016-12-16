"use strict";

let chalk = require('chalk');

/*const testRequiredLen = 20;
const testInput = '10000';
console.log(chalk.yellow('Test P1 :: checksum is: '+solve(testRequiredLen, testInput)));
*/

const input = '10111011111001111';
console.log(chalk.green('Puzzle P1 :: checksum is: '+solve(272, input)));
console.log(chalk.blue('Puzzle P2 :: checksum is: '+solve(35651584, input)));

function solve(len, input) {

  let dragon =  input;
  do
  {
    let init = dragon;

    // reverse
    let reverse = init.split('').reverse().join('');

    // 0 becomes 1, 1 becomes 0
    reverse = reverse.replace(new RegExp('0', 'g'), 'X');
    reverse = reverse.replace(new RegExp('1', 'g'), '0');
    reverse = reverse.replace(new RegExp('X', 'g'), '1');

    dragon = init + '0' + reverse;
  } while (dragon.length < len)


  // only keep correct len
  dragon = dragon.substring(0, len);

  // calculate checksum
  let checksum = dragon;
  do {
    checksum = getChecksum(checksum);
  } while (checksum.length%2==0)

  return checksum;
}

function getChecksum(str) {
  var chunks = [];
  for (let i = 0; i < str.length; i += 2) {
      chunks.push(str.substring(i, i + 2));
  }

  let chsm = '';
  for (let j=0; j<chunks.length; j++) {
      chsm += (chunks[j][0] == chunks[j][1] ? '1' : '0');
  }

  return chsm;
}

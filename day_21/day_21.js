"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');


const input = 'abcdefgh';
const instructions = utils.dataFromFile('d21_data/puzzle.txt');
/*
const input = 'abcde';
const instructions = utils.dataFromFile('d21_data/test.txt');
*/
//scramble(input, instructions, true);

unscramble('fbgdceah', instructions);

function scramble(input, instructions, log) {
  if (log) console.log(chalk.yellow(input));

  let result = input;
  for (let i=0; i<instructions.length; i++) {
    let instruction = instructions[i];
    if (instruction.trim().length>0) {

      if (log) console.log(chalk.blue(instruction));

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
        let matches = instruction.match(/\d+/g);

        let pos1 = parseInt(matches[0]);
        let pos2 = parseInt(matches[1]);

        let stringP1 = result.substring(0, pos1);
        let stringP2 = result.substring(pos1, pos2+1);
        let stringP3 = result.substring(pos2+1, result.length);

        let reversed = reverseString(stringP2);
        result = stringP1 + reversed + stringP3;

      } else if (instruction.startsWith('rotate based')) {
        let tokens = instruction.split(' ');
        let letter = tokens[6];

        let resultArr = result.split('');
        let idx = resultArr.indexOf(letter);
        let steps = 1+idx;

        if (idx >= 4)
          steps ++;

        for (let j=0; j<steps; j++) {
          result = shiftRight(result.split('')).join().replace(/,/g,'');
        }

      } else if (instruction.startsWith('rotate')) {
        let tokens = instruction.split(' ');
        let step = parseInt(tokens[2]);

        if (tokens[1] == 'left') {
          for (let j=0; j<step; j++) {
            result = shiftLeft(result.split('')).join().replace(/,/g,'');
          }
        } else { // right
          for (let j=0; j<step; j++) {
            result = shiftRight(result.split('')).join().replace(/,/g,'');
          }
        }

      } else if (instruction.startsWith('move position')) {
        let matches = instruction.match(/\d+/g);
        let pos1 = parseInt(matches[0]);
        let pos2 = parseInt(matches[1]);

        let resultArr = result.split('');
        let toMove = result[pos1];

        resultArr.splice(pos1, 1);
        resultArr.splice(pos2, 0, toMove);

        result = resultArr.join().replace(/,/g,'');
      }
      if (log) console.log(chalk.yellow(result));
    }
  }

  if (log) console.log(chalk.green('Scrambled password is: ')+result);
  return result;
}

function unscramble(input, instructions) {
  let inputArr = input.split('');
  let permutations = permutator(inputArr);

  for (let i=0; i<permutations.length; i++) {
    let start = permutations[i].join().replace(/,/g,'');
    let scrambled = scramble(start, instructions, false);

    if (scrambled == input) {
      console.log(chalk.green('The initial scrambled password is: '+start));
    }
  }
}

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

function reverseString(str) {
  let newString = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

function shiftRight(arr)
{
	var temp = new Array();
	temp.push(arr[arr.length-1]);
	for (let i = 0; i <= arr.length-2; i++) temp.push(arr[i]);
	return temp;
}

function shiftLeft(arr)
{
	var temp = new Array();
	for (let i = 1; i <= arr.length-1; i++) temp.push(arr[i]);
	temp.push(arr[0]);
	return temp;
}

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

"use strict";

var chalk = require('chalk');
var utils = require('./utils/utils.js');

var lines = utils.dataFromFile('d10_data/puzzle.txt');

var bots = {};
var outputs = {};
var instructions = new Array();

for (var i=0; i<lines.length; i++) {
  if (lines[i].trim().length>0) {
    var line = lines[i];
    if (line.startsWith('value')) {
      // assign to bot
      var matches = line.match(/\d+/g);
      if (!bots[matches[1]]) {
        bots[matches[1]] = new Array();
      }
      bots[matches[1]].push(parseInt(matches[0]));
    } else {
      instructions.push(line);
    }
  }
}

/*
bot 2 gives low to bot 1 and high to bot 0
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
*/

var responsibleBotFound = false;
while (instructions.length>0) {

  if (!responsibleBotFound) {
    if (checkForValues([61,17], bots)) {
        responsibleBotFound = true;
    }
  }

  var instr = instructions.shift();
  var tokens = instr.split(' ');
  var bot = tokens[1];
  if (bots[bot] && bots[bot].length==2) {
    console.log(chalk.yellow('executing current instruction ['+instr+']'));

    var lowTo = tokens[5];
    var lowToVal = tokens[6];
    var highTo = tokens[10];
    var highToVal = tokens[11];

    var val1 = bots[bot][0];
    var val2 = bots[bot][1];
    bots[bot] = new Array();

    setVal(bots, outputs, lowTo, lowToVal, val1<val2 ? val1 : val2);
    setVal(bots, outputs, highTo, highToVal, val1<val2 ? val2 : val1);
  } else {
    // Instruction cannot be executed right now, let's postpone it
    instructions.push(instr);
  }
}

console.log(chalk.green('P2 answer: ')+(outputs['0']*outputs['1']*outputs['2']));

function setVal(bots, outputs, valTarget, valTargetIdx, val) {
  if (valTarget == 'bot') {
    if (!bots[valTargetIdx]) {
      bots[valTargetIdx] = new Array();
    }
    bots[valTargetIdx].push(val);
  } else {
    if (!outputs[valTargetIdx]) {
      outputs[valTargetIdx] = new Array();
    }
    outputs[valTargetIdx].push(val);
  }
}

function checkForValues(valArray, bots) {
  for(var botIdx in bots) {
    var bot = bots[botIdx];
    if (bot.indexOf(valArray[0]) != -1 && bot.indexOf(valArray[1]) != -1) {
      console.log(chalk.magenta('Bot responsible for defined values is: Bot '+botIdx));
      return true;
    }
  }
  return false;
}

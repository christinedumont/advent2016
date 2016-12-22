"use strict";

let DRange = require('discontinuous-range');
let chalk = require('chalk');
let utils = require('./../utils/utils.js');
let logUpdate = require('log-update');

const lines = utils.dataFromFile('d20_data/puzzle.txt');
const max = 4294967295;

process.stdout._handle.setBlocking(true);

resolve(lines, max);
//resolve(['5-8','0-2','4-7', '1-2', '4-5', '11-12', '11-14'], 20);

function resolve(lines, max) {
  let allNumbers = new DRange(0, max);
  let blacklisted = new DRange();

  for (let i=0; i<lines.length; i++) {
      let line = lines[i];
      if (line.trim().length>0) {
        let tokens = line.split('-');

        let t1 = parseInt(tokens[0]);
        let t2 = parseInt(tokens[1]);

        blacklisted.add(Math.min(t1,t2), Math.max(t1,t2));
      }
    }

    let validIPs = allNumbers.clone().subtract(blacklisted);
    console.log(chalk.green('Lowest valid IP: ')+chalk.blue(validIPs.index(0)+''));
    console.log(chalk.green('Total valids IPs: ')+chalk.blue(validIPs.length+''));
}

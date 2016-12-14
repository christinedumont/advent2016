"use strict";

let md5 = require('md5');
let chalk = require('chalk');

const testSalt = 'abc';  //22728
const salt = 'ngcjuoqr';

generateKeys(salt, true);

function generateKeys(salt, isPart2) {
  let confirmedKeys = [];
  let tempKeys = [];

  let idx = 0;
  while (confirmedKeys.length<64) {

    tempKeys = cleanTempKeys(tempKeys, idx);
    let hash = makeKeyHash(salt, idx, isPart2);

    const reg = /(.)\1{2,}/;
    let match = reg.exec(hash);
    if (match && match[0].length>2) {

      if (match[0].length >= 5) {
        let newTempKeys = [];
        for(let i=0; i<tempKeys.length; i++) {
          if (tempKeys[i].triple == match[0].substring(0, 3)) {
            console.log(chalk.magenta('Confirmed key ['+(confirmedKeys.length+1)+']: '+JSON.stringify((tempKeys[i]))+' at index: '+idx));
            confirmedKeys.push(tempKeys[i]);
          } else {
            newTempKeys.push(tempKeys[i]);
          }
        }
        tempKeys = newTempKeys;
      }

      let keyObj = makeKey(hash, idx, match[0].substring(0, 3));
    //  console.log(chalk.green('Key created: '+JSON.stringify(keyObj)));
      tempKeys.push(keyObj);
    }
    idx ++;
  }

  console.log(chalk.yellow('Key 64 is: '+JSON.stringify(confirmedKeys[63])));
}

function cleanTempKeys(tempKeys, currentIdx) {
  let arr = [];
  for(let i=0; i<tempKeys.length; i++) {
    if ((tempKeys[i].idx+1000) > currentIdx) {
      arr.push(tempKeys[i]);
    }
  }
  return arr;
}

function makeKey(hash, idx, triple) {
  return {
    'key' : hash,
    'idx' : idx,
    'triple' : triple
  };
}

function makeKeyHash(salt, idx, isPart2) {
  if (!isPart2) {
    return md5(salt+''+idx).toLowerCase();
  } else {
    let hash = md5(salt+''+idx).toLowerCase();
    for (let i=0; i<2016; i++) {
      hash = md5(hash).toLowerCase();
    }
    return hash;
  }
}

"use strict";

let md5 = require('md5');
let chalk = require('chalk');

const testSalt = 'abc';
const salt = 'ngcjuoqr';

generateKeys(testSalt);

function generateKeys(salt) {
  let confirmedKeys = [];
  let tempKeys = [];

  let idx = 0;
  while (confirmedKeys.length<65) {

    let hash = makeKeyHash(salt, idx);

    const reg = /(.)\1\1/;
    let match = reg.exec(hash);
    if (match && match[0].length>2) {
      let createKey = true;
      if (match.length >= 5) {
        // Could be a key confirmation, let's check
        let confirmationIdx = isConfirmation(tempKeys, hash, idx, match[0].substring(0,5));
        if (confirmationIdx != -1) {
          createKey = false;
        }
      }

      if (createKey) {
        // It's a new key
        let keyObj = createKey(hash, idx, match[0].substring(0, 3));
        console.log(chalk.green('Found key: '+JSON.stringify(keyObj)));
        tempKeys.push(keyObj);
      }
    }

    idx ++;
  }
}

function isConfirmation(tempKeys, hash, idx, fiveOfAKind) {

}

function createKey(hash, idx, triple) {
  return {
    'key' : hash,
    'idx' : idx,
    'triple' : triple
  };
}

function makeKeyHash(salt, idx) {
  return md5(salt+''+idx).toLowerCase();
}

"use strict";

let utils = require('./../utils/utils.js');
let crypt = require('./../utils/caesar.js');

let lines = utils.dataFromFile('d4_data/puzzle.txt');
processLines(lines);

function processLines(lines) {
  let sectorTotal = 0;
  let part2Possibilities = new Array();
  for (let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i];
    if (line.trim().length > 0) {

      // extract data
      let roomname = line.substring(0, line.search(/\d+/g));
      let sectorId = line.match(/\d+/g);
      let checksum = line.substring(line.indexOf('[')+1, line.indexOf(']'));

      // remove all dash from roomname, keep letter only
      let roomnameForShift = roomname.replace(/[^a-z]/gi, ' ');
      roomname = roomname.replace(/[^a-z]/gi, '');

      let letters = roomToLetters(roomname);
      letters.sort(function(a, b) {
          if(a.value === b.value) {
              let x = a.key.toLowerCase(), y = b.key.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
          }
          return b.value-a.value;
      });

      let result = lettersArrToString(letters);
      if (result == checksum) {
        sectorTotal += parseInt(sectorId);

        // Decipher roomname
        let realname = crypt.caesarShift(roomnameForShift,parseInt(sectorId));

        // let's try and find some common worlds
        if (realname.indexOf('north') !== -1 || realname.indexOf('pole') !== -1) {
          part2Possibilities.push('Name: '+ realname +', SectorId: '+parseInt(sectorId));
        }
      }
    }
  }
  console.log('Part 1 answer, sum of sector ID for valid rooms: '+sectorTotal);
  console.log('Part 2 possible(s) answer(s):\n', part2Possibilities);

  return sectorTotal;
};

function roomToLetters(string) {
  let freq = new Array();
  for (let i=0; i<string.length;i++) {
    let character = string.charAt(i);

    if(!freq.filter(function(elem) {
      return elem.key === character;
    }).length) {
      freq.push({ key: character, value: 1 });
    } else {
      for (let j=0; j<freq.length; j++) {
        if (freq[j].key==character) {
          freq[j].value = freq[j].value+1;
        }
      }
    }
  }
  return freq;
};

function lettersArrToString(array) {
  let myStr = '';
  let min = Math.min(5, array.length);
  for (let i=0; i<min;i++) {
    myStr = myStr + array[i].key;
  }
  return myStr;
}

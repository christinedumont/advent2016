"use strict";

var fs = require('fs');
var crypt = require('./utils/caesar.js');

//var lines = dataFromFile('d4_data/test.txt');
//(processLines(lines)==1514) ? console.log('...... Success') : console.log('....... Failure');

//var test2 = dataFromFile('d4_data/test2.txt');
//processLines(test2);

var lines = dataFromFile('d4_data/puzzle.txt');
processLines(lines);

function processLines(lines) {
  var sectorTotal = 0;
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    if (line.trim().length > 0) {

      // extract data
      var roomname = line.substring(0, line.search(/\d+/g));
      var sectorId = line.match(/\d+/g);
      var checksum = line.substring(line.indexOf('[')+1, line.indexOf(']'));

      // remove all dash from roomname, keep letter only
      var roomnameForShift = roomname.replace(/[^a-z]/gi, ' ');
      var roomname = roomname.replace(/[^a-z]/gi, '');

      var letters = roomToLetters(roomname);
      letters.sort(function(a, b) {
          if(a.value === b.value) {
              var x = a.key.toLowerCase(), y = b.key.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
          }
          return b.value-a.value;
      });

      var result = lettersArrToString(letters);
      if (result == checksum) {
        sectorTotal += parseInt(sectorId);

        // Decipher roomname
        var realname = crypt.caesarShift(roomnameForShift,parseInt(sectorId));

        // let's try and find some common worlds
        if (realname.indexOf('north') !== -1 || realname.indexOf('pole') !== -1) {
          console.log('Part 2 possible answer [%s]: '+ realname, parseInt(sectorId));
        }
      }
    }
  }
  console.log('Part one answer, sum of sector ID for valid rooms: '+sectorTotal);
  return sectorTotal;
};

function roomToLetters(string) {
  var freq = new Array();
  for (var i=0; i<string.length;i++) {
    var character = string.charAt(i);

    if(!freq.filter(function(elem) {
      return elem.key === character;
    }).length) {
      freq.push({ key: character, value: 1 });
    } else {
      for (var j=0; j<freq.length; j++) {
        if (freq[j].key==character) {
          freq[j].value = freq[j].value+1;
        }
      }
    }
  }
  return freq;
};

function lettersArrToString(array) {
  var myStr = '';
  var min = Math.min(5, array.length);
  for (var i=0; i<min;i++) {
    myStr = myStr + array[i].key;
  }
  return myStr;
}

function dataFromFile(filename) {
  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split('\n');
  return lines;
};

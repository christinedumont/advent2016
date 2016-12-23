"use strict";

let chalk = require('chalk');
let utils = require('./../utils/utils.js');

const data = utils.dataFromFile('d22_data/puzzle.txt');

let nodes = getNodes(data);
console.log('Number of viable pairs: '+viablePairs(nodes));  //981

function getNodes(data) {
  let nodes = [];

  for (let i=0; i<data.length; i++) {
    let line = data[i];
    if (line.trim().length>0 && line.startsWith('/dev/grid')) {
      nodes.push(buildNode(line));
    }
  }

  return nodes;
}

function buildNode(line) {
  let matches = line.match(/\d+/g);
  let node =  {
    'n' : line.split(' ')[0],
    'x' : parseInt(matches[0]),
    'y' : parseInt(matches[1]),
    's' : parseInt(matches[2]),
    'u' : parseInt(matches[3]),
    'a' : parseInt(matches[4])
  };
  return node;
}

function viablePairs(nodes) {
  let viablePairs = 0;
  for (let i=0; i<nodes.length; i++) {
    for (let j=0; j<nodes.length; j++) {
      let n1 = nodes[i];
      let n2 = nodes[j];

      if (n2.u != 0 && n2.n != n1.n && n2.u <= n1.a) {
        viablePairs++;
      }
    }
  }

  return viablePairs;
}

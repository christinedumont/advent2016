"use strict";

var PF = require('pathfinding');
let chalk = require('chalk');

console.log(chalk.blue('Puzzle\n---------'));

let width = 32;
let height = 41;
let designerNumber = 1364;

let grid = gridForMaze(width, height, designerNumber);
console.log(chalk.green('P1 :: Distance: '+ solveMaze(grid, 31, 39)));

// P2 for each coordinate, get path lenght
let allLen = [];

var count = 0;
for (let y=0; y<height; y++) {
  for (let x=0; x<width; x++) {
    if (isOpenSpace(x,y,designerNumber)) {
      let grid = gridForMaze(width, height, designerNumber);
      var len = solveMaze(grid, x, y);
      if (len > 0 && len <= 50)
        count ++;
    }
  }
}

console.log(chalk.green('P1 :: Locations with at most 50 steps: '+ (count+1)));

// ------ ------ ------ ------

function gridForMaze(w, h, designerNumber) {
  let grid = new PF.Grid(w, h);
  for (let y=0; y<h; y++) {
    for (let x=0; x<w; x++) {
      grid.setWalkableAt(x, y, isOpenSpace(x,y,designerNumber));
    }
  }
  return grid;
}

function solveMaze(grid, targetX, targetY) {
  var finder = new PF.AStarFinder();
  var path = finder.findPath(1, 1, targetX, targetY, grid);
  return path.length-1;
}

function isOpenSpace(x, y, designerNumber) {
  let number = (x*x + 3*x + 2*x*y + y + y*y) + designerNumber;
  let binary = number.toString(2);
  let numberOfOnes = (binary.match(/1/g) || []).length;
  return (numberOfOnes % 2 == 0);
};

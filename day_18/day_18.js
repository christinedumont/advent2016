"use strict";

let chalk = require('chalk');

const input = '^^.^..^.....^..^..^^...^^.^....^^^.^.^^....^.^^^...^^^^.^^^^.^..^^^^.^^.^.^.^.^.^^...^^..^^^..^.^^^^';
const totalRow = 400000;

let rows = [];
rows.push(input);

for (let i=0; i<(totalRow-1); i++) {
  let base = rows[i];
  let newrow = '';

  for (let j=0; j<base.length; j++) {
    let left = j==0 ? '.' : base.charAt(j-1);
    let center = base.charAt(j);
    let right = (j==(base.length-1)) ? '.' : base.charAt(j+1);
    newrow += isTrap(left, center, right) ? '^' : '.';
  }
  rows.push(newrow);
}

let count = 0;
for (let i=0; i<rows.length; i++) {
  let row = rows[i];
  for (let j=0; j<row.length; j++) {
    if (row.charAt(j)=='.') count ++;
  }
}

console.log(count);

/*
Then, a new tile is a trap only in one of the following situations:

Its left and center tiles are traps, but its right tile is not.
Its center and right tiles are traps, but its left tile is not.
Only its left tile is a trap.
Only its right tile is a trap.
*/
function isTrap(left, center, right) {

  if (left=='^' && center=='^' && right=='.')
    return true;

  if (left=='.' && center=='^' && right=='^')
    return true;

  if (left=='^' && center=='.' && right=='.')
    return true;

  if (left=='.' && center=='.' && right=='^')
    return true;

  return false;
}

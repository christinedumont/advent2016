"use strict";

/*
The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
The third floor contains a thulium-compatible microchip.
The fourth floor contains nothing relevant.
*/

console.log('TEST :: Steps: ' + bfs({
  floor: 0,
  pairs: [ // G,M
    1, 0, // H
    2, 0, // L
  ]
}));

console.log('P1 :: Steps: ' + bfs({
  floor: 0,
  pairs: [ // G,M
    0, 0, // S
    1, 1, // R
    1, 2, // T
    0, 0, // P
    1, 1, // C
  ]
}));

console.log('P2 :: Steps: ' + bfs({
  floor: 0,
  pairs: [ // G,M
    0, 0, // S
    1, 1, // R
    1, 2, // T
    0, 0, // P
    1, 1, // C
    0, 0, // E
    0, 0, // D
  ]
}));

function bfs(initialState) {
  const alreadyVisited = {};
  const queue = { head: null, tail: null, length: 0 };

  let queueNode = {'prev':null, 'state':initialState};
  push(queue, queueNode);

  let currentNode;
  while (currentNode = pop(queue)) {
    const state = currentNode.state;

    if (isDone(state)) {
      const steps = [];
      while (currentNode) {
        steps.push(currentNode.state);
        currentNode = currentNode.prev;
      }
      return steps.length-1;
    }

    const nextStates = validateStates(findPossibles(state), alreadyVisited);
    for (let i = 0; i < nextStates.length; i++) {
      let node = {'prev':currentNode, 'state':nextStates[i]};
      push(queue, node);
    }
  }
}

function validateStates(states, alreadyVisited) {
  var valids = [];
  states.forEach(function(state) {
    const hash = hashForState(state)
    if (!alreadyVisited[hash] && !isFried(state)) {
      valids.push(state);
    }
    alreadyVisited[hash] = true;
  });
  return valids;
}

function hashForState(state) {
  const arr = [];
  for (let i = 0; i < state.pairs.length; i += 2) {
    arr.push(state.pairs[i] + ":" + state.pairs[i + 1]);
  }
  return arr.sort().join('')+state.floor;
}

function findPossibles(state) {
  const movingPair = [];

  // Find all on current floor
  for (let i = 0; i < state.pairs.length; i++) {
    if (state.pairs[i] === state.floor) {
      movingPair.push(i);
    }
  }

  const states = [];
  
  if (state.floor > 0) {
    for (let i = 0; i < movingPair.length; i++) {
      states.push(createState(state, -1, movingPair[i]));
      for (let j = i + 1; j < movingPair.length; j++) {
        states.push(createState(state, -1, movingPair[i], movingPair[j]));
      }
    }
  }

  if (state.floor < 3) {
    for (let i = 0; i < movingPair.length; i++) {
      for (let j = i + 1; j < movingPair.length; j++) {
        states.push(createState(state, 1, movingPair[i], movingPair[j]));
      }
      states.push(createState(state, 1, movingPair[i]));
    }
  }

  return states;
}

function createState(state, direction, firstItem, secondItem) {
  const nextState = {
    'floor' : state.floor+direction,
    'pairs' : state.pairs.slice()

  };
  nextState.pairs[firstItem] += direction;
  if (secondItem !== undefined) {
    nextState.pairs[secondItem] += direction;
  }
  return nextState;
}

function isDone(state) {
  for (let i = 0; i < state.pairs.length; i++) {
    if (state.pairs[i] !== 3) return false; // are every element on third floor
  }
  return true;
}

function isFried(state) {
  const pairs = state.pairs
  for (let i = 0; i < pairs.length; i += 2) {
    if (pairs[i] !== pairs[i + 1]) {
      for (let j = 0; j < pairs.length; j += 2) {
        if (pairs[j] === pairs[i + 1]) {
          return true;
        }
      }
    }
  }
  return false;
}

function push(queue, value) {
  const node = { next: null, value };
  if (queue.head) {
    queue.head.next = node;
  }
  queue.head = node;
  if (!queue.tail) {
    queue.tail = node;
  }
  queue.length++;
}

function pop(queue) {
  const node = queue.tail;
  if (node) {
    queue.tail = node.next;
    if (!queue.tail) {
      queue.head = null;
    }
    node.next = null;
    queue.length--;
    return node.value;
  }
}

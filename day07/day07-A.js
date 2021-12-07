#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Main Execution

let crabs     = IO.readline(line => line.split(',').map(n => parseInt(n, 10)));
let sorted    = crabs.sort((a, b) => a - b);
let optimal   = sorted[crabs.length / 2];
let movements = crabs.map(crab => Math.abs(optimal - crab));
let total     = movements.reduce((a, b) => a + b, 0);

IO.print(`Part A: ${total}`);

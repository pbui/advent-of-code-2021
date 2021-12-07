#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Functions

function distance(d) {
    return d * (d + 1) / 2;
}

// Main Execution

let crabs          = IO.readline(line => line.split(',').map(n => parseInt(n, 10)));
let min_position   = Math.min(...crabs);
let max_position   = Math.max(...crabs);
let min_fuel_costs = Number.MAX_SAFE_INTEGER;

for (let position = min_position; position < max_position; position++) {
    let movements  = crabs.map(crab => distance(Math.abs(position - crab)));
    let fuel_costs = movements.reduce((a, b) => a + b, 0);
    min_fuel_costs = Math.min(min_fuel_costs, fuel_costs);
}

IO.print(`Part B: ${min_fuel_costs}`);

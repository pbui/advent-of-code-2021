#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Constants

const MAX = 9;
const DIRECTIONS = [
    [ 0, -1], // Left
    [ 0,  1], // Right
    [-1,  0], // Up
    [ 1,  0]  // Down
];

// Functions

function padmap(map) {
    let padrow = new Array(map[0].length + 2).fill(MAX);
    return [padrow, ...map.map(row => [MAX, ...row, MAX]), padrow];
}

function find_low_points(heatmap) {
    let low_points = [];

    for (let row = 1; row < heatmap.length - 1; row++) {
	for (let col = 1; col < heatmap[0].length - 1; col++) {
    	    let is_lower = DIRECTIONS.filter(([dr, dc]) => 
    	    	heatmap[row][col] < heatmap[row + dr][col + dc]
	    );
	    if (is_lower.length == DIRECTIONS.length) {
	    	low_points.push(heatmap[row][col]);
	    }
	}
    }

    return low_points;
}

// Main Execution

let heatmap    = padmap(IO.readlines(line => line.split('').map(n => parseInt(n, 10))));
let low_points = find_low_points(heatmap);
let part_a     = low_points.reduce((t, p) => t + p + 1, 0);

IO.print(`Part A: ${part_a}`);
IO.print(`Part B: ${part_b}`);

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
	    	low_points.push([heatmap[row][col], row, col]);
	    }
	}
    }

    return low_points;
}

function find_basins(heatmap, low_points) {
    return low_points.map(([_, row, col]) => walk_heatmap(heatmap, [row, col]));
}

function walk_heatmap(heatmap, start) {
    let frontier = [start];
    let visited  = new Set();

    while (frontier.length) {
    	let [row, col] = frontier.shift();
    	let node_id    = row*heatmap[0].length + col;

    	if (visited.has(node_id)) {
    	    continue;
	}

	visited.add(node_id);

	DIRECTIONS.map(([dr, dc]) => {
	    if (heatmap[row + dr][col + dc] < MAX) {
	    	frontier.push([row + dr, col + dc]);
	    }
	});
    }

    return visited.size;
}

// Main Execution

let heatmap    = padmap(IO.readlines(line => line.split('').map(n => parseInt(n, 10))));
let low_points = find_low_points(heatmap);

let part_a     = low_points.reduce((t, p) => t + p[0] + 1, 0);
IO.print(`Part A: ${part_a}`);

let basins     = find_basins(heatmap, low_points);
let part_b     = basins.sort((a, b) => b - a).slice(0, 3).reduce((s, n) => s * n, 1);
IO.print(`Part B: ${part_b}`);

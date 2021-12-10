#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Constants

const OPENING_BRACKETS = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};

const CLOSING_BRACKETS = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const COMPLETE_POINTS = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
};

// Functions

function parse_line(line) {
    let stack = [];

    for (let bracket of line) {
    	if (bracket in OPENING_BRACKETS) {
    	    stack.push(bracket);
	} else {
	    if (!stack.length) {
	    	return [0, stack];
	    }

	    let previous = stack.pop();
	    if (bracket != OPENING_BRACKETS[previous]) {
	    	return [CLOSING_BRACKETS[bracket], null];
	    }
	}
    }

    return [0, stack];
}

function complete_line(line) {
    return line.reverse().reduce((s, b) => 5*s + COMPLETE_POINTS[b], 0);
}

// Main Execution

let lines  = IO.readlines(line => line.split(''));
let part_a = lines.reduce((s, l) => s + parse_line(l)[0], 0);
IO.print(`Part A: ${part_a}`);

let scores = lines.map(parse_line)
		  .filter(p => !p[0])
		  .map(p => complete_line(p[1]))
		  .sort((a, b) => (a - b));
let part_b = scores[Math.floor(scores.length / 2)];
IO.print(`Part B: ${part_b}`);

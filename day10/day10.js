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

// Functions

function parse_line(line) {
    let stack = [];

    for (let bracket of line) {
    	if (bracket in OPENING_BRACKETS) {  // Opening bracket
    	    stack.push(bracket);
	} else {			    // Closing bracket
	    if (!stack.length) {	    // Incomplete: missing closing bracket
	    	return 0;
	    }

	    let previous = stack.pop();
	    if (bracket != OPENING_BRACKETS[previous]) {
	    	return CLOSING_BRACKETS[bracket];
	    }
	}
    }

    return 0;
}

// Main Execution

let lines  = IO.readlines(line => line.split(''));
let part_a = lines.reduce((s, l) => s + parse_line(l), 0);

IO.print(`Part A: ${part_a}`);

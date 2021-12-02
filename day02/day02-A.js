#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Functions

function process_commands(commands) {
    let [position, depth] = [0, 0];

    commands.forEach(command => {
    	let [direction, magnitude] = [command[0], parseInt(command[1])];

    	if (direction == 'forward') {
    	    position += magnitude;
	} else if (direction == 'down') {
    	    depth += magnitude;
	} else if (direction == 'up') {
    	    depth -= magnitude;
	}
    });

    return position * depth;
}

// Main Execution

let commands = IO.readlines(s => s.split(' '));
let result   = process_commands(commands);
IO.print(result);

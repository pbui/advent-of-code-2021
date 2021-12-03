#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Functions

function count_columns(report) {
    let counts = new Array(report[0].length).fill(0);
    report.forEach(number => {
    	for (let index in number) {
    	    counts[index] += parseInt(number[index]);
	}
    });
    return counts;
}

function most_common(counts, total) {
    return counts.map(count => 2*count >= total ? '1' : '0')
}

function least_common(counts, total) {
    return counts.map(count => 2*count <  total ? '1' : '0')
}

// Main Execution

let report  = IO.readlines();
let counts  = count_columns(report)
let gamma   = parseInt(most_common(counts, report.length).join(''), 2);
let epsilon = parseInt(least_common(counts, report.length).join(''), 2);
IO.print(gamma * epsilon);

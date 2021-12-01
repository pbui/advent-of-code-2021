#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Functions

function count_increasing_depths(report, length = 1) {
    return report.slice(0, report.length - length + 1).filter(
    	(value, index) => (value < report[index + length])
    ).length;
}

// Main Execution

let report    = IO.readlines(parseInt);
let increases = count_increasing_depths(report);
IO.print(increases);

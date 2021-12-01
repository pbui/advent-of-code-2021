#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Functions

function count_increasing_depths(report) {
    return report.slice(1).filter((value, index) => (value > report[index])).length;
}

// Main Execution

let report    = IO.readlines(parseInt);
let increases = count_increasing_depths(report);
IO.print(increases);

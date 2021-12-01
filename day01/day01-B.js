#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('.');
const Utils = imports.utils;

// Functions

function count_increasing_depths(report) {
    return report.slice(1).filter((value, index) => (value > report[index])).length;
}

function group_windows(report, length = 3) {
    return report.slice(0, report.length - length + 1).map(
    	(value, index) => report.slice(index, index + length).reduce((a, b) => (a + b), 0)
    );
}

// Main Execution

let report    = Utils.read_lines(parseInt);
let windows   = group_windows(report);
let increases = count_increasing_depths(windows);
Utils.println(increases);

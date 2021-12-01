#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('.');
const Utils = imports.utils;

// Functions

function count_increasing_depths(report) {
    return report.slice(1).filter((value, index) => (value > report[index])).length;
}

// Main Execution

let report    = Utils.read_lines(parseInt);
let increases = count_increasing_depths(report);
Utils.println(increases);

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

function filter_numbers(report, aggregator) {
    for (let index = 0; report.length > 1; index++) {
    	let counts = count_columns(report);
    	let common = aggregator(counts, report.length);

    	report = report.filter(number => number[index] == common[index]);
    }

    return parseInt(report[0], 2);
}

// Main Execution

let report = IO.readlines();
let oxygen = filter_numbers(report, most_common);
let carbon = filter_numbers(report, least_common);
IO.print(oxygen * carbon);

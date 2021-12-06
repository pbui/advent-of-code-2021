#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Constants

const MAX_DAYS  = 256;
const RESET_DAY = 6;
const BIRTH_DAY = 8;

// Functions

function simulate_day(old_table) {
    newborns = old_table[BIRTH_DAY];
    resets   = old_table[0] + old_table[RESET_DAY + 1];
    births   = old_table[0];
    return [...old_table.splice(1, RESET_DAY), resets, newborns, births];
}

function simulate_days(table, days = MAX_DAYS) {
    for (let day = 0; day < days; day++) {
	table = simulate_day(table);
    }

    return table.reduce((a, b) => a + b, 0);
}

// Main Execution

let fish_table = new Array(BIRTH_DAY + 1).fill(0);
IO.readline(line => line.split(',')).forEach(number => fish_table[parseInt(number)]++);

IO.print(`Sample: ${simulate_days(fish_table.slice(0), 18)}`);
IO.print(`Part A: ${simulate_days(fish_table.slice(0), 80)}`);
IO.print(`Part B: ${simulate_days(fish_table.slice(0), 256)}`);

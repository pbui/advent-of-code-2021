#!/usr/bin/env gjs

// Imports

imports.searchPath.unshift('../common');
const IO = imports.io;

// Constants

const KNOWN_LENGTHS = [2, 4, 3, 7];

// Functions

function ctoi(c) {  // Character to ASCII integer
    return c.charCodeAt(0);
}

function stoi(s) {  // Signal string to integer bitset
    return s.split('').reduce((t, c) => t + (1<<(ctoi(c) - ctoi('a'))), 0);
}

// Main Execution

let entries = IO.readlines(line => line.split(' | '));

let part_a  = entries.reduce((total, entry) => {
    let [_, outputs] = entry;
    outputs = outputs.split(' ');
    matches = outputs.filter(output => KNOWN_LENGTHS.includes(output.length)).length;
    return total + matches;
}, 0);

let part_b  = entries.reduce((total, entry) => {
    let [patterns, outputs] = entry;
    let bitsets = new Array(10).fill(0);
    patterns    = patterns.split(' ');
    outputs     = outputs.split(' ').map(stoi);

    // Base sets
    bitsets[1] = stoi(patterns.filter(pattern => pattern.length == 2)[0]);
    bitsets[4] = stoi(patterns.filter(pattern => pattern.length == 4)[0]);
    bitsets[7] = stoi(patterns.filter(pattern => pattern.length == 3)[0]);
    bitsets[8] = stoi(patterns.filter(pattern => pattern.length == 7)[0]);

    // Sets of length 5: 2, 3, 5
    let fives  = patterns.filter(pattern => pattern.length == 5).map(stoi);
    bitsets[2] = fives.filter(bitset => (bitset | bitsets[4]) == bitsets[8])[0];
    bitsets[5] = fives.filter(bitset => (bitset | bitsets[2]) == bitsets[8])[0];
    bitsets[3] = fives.filter(bitset => (bitset != bitsets[2] && bitset != bitsets[5]));
    
    // Sets of length 6: 0, 6, 9
    let sixes  = patterns.filter(pattern => pattern.length == 6).map(stoi);
    bitsets[0] = sixes.filter(bitset => (bitset | bitsets[5]) == bitsets[8])[0];
    bitsets[6] = sixes.filter(bitset => (bitset | bitsets[7]) == bitsets[8])[0];
    bitsets[9] = sixes.filter(bitset => (bitset != bitsets[0] && bitset != bitsets[6]));

    // Construct mapping
    let mapping = bitsets.reduce((d, b, i) => (d[b] = i, d), {});

    // Construct digit
    let display = outputs.reduce((total, output) => total + mapping[output].toString(), '');

    // Reduction
    return total + parseInt(display, 10);
}, 0);

IO.print(`Part A: ${part_a}`);
IO.print(`Part B: ${part_b}`);

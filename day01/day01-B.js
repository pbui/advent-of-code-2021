#!/usr/bin/env gjs

// Imports

const Gio = imports.gi.Gio;
const ByteArray = imports.byteArray;

// Globals

let Stdin = new Gio.DataInputStream({
    base_stream: new Gio.UnixInputStream({ fd: 0 })
});

let Stdout = new Gio.DataOutputStream({
    base_stream: new Gio.UnixOutputStream({ fd: 1 })
});

// Utilities

function println(object) {
    Stdout.write(object + '\n', null);
}

function for_each_line(thunk, stream = Stdin) {
    for (let [line, length] = stream.read_line(null); length; [line, length] = stream.read_line(null)) {
    	let string = ByteArray.toString(line);
    	thunk(string);
    }
}

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

let report = [];
for_each_line(line => {
    report.push(parseInt(line));
});

let windows   = group_windows(report);
let increases = count_increasing_depths(windows);
println(increases);

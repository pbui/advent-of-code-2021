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

function print(object) {
    Stdout.write(object + '\n', null);
}

function readlines(thunk = null, stream = Stdin) {
    let lines = [];
    for_each_line(line => {
    	if (thunk == null) {
	    lines.push(line);
	} else {
	    lines.push(thunk(line));
	}
    });
    return lines;
}

function readline(thunk = null, stream = Stdin) {
    let [line, length] = stream.read_line(null);
    if (length) {
    	let string = ByteArray.toString(line);
    	if (thunk != null) {
	    string = thunk(string);
	}

	return string;
    }
    return null;
}

function for_each_line(thunk, stream = Stdin) {
    for (let line = readline(null, stream); line; line = readline(null, stream)) {
    	thunk(line);
    }
}

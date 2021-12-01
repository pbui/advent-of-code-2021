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

function read_lines(thunk, stream = Stdin) {
    let lines = [];
    for_each_line(line => {
	lines.push(thunk(line));
    });
    return lines;
}

function for_each_line(thunk, stream = Stdin) {
    for (let [line, length] = stream.read_line(null); length; [line, length] = stream.read_line(null)) {
    	let string = ByteArray.toString(line);
    	thunk(string);
    }
}

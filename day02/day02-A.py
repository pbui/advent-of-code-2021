#!/usr/bin/env python3

import sys

# Functions

def process_commands(commands):
    position, depth = 0, 0

    for direction, magnitude in commands:
        if direction == 'forward':
            position += int(magnitude)
        elif direction == 'down':
            depth += int(magnitude)
        elif direction == 'up':
            depth -= int(magnitude)

    return position, depth

# Main Execution

def main():
    commands        = [line.split() for line in sys.stdin]
    position, depth = process_commands(commands)
    print(position * depth)

if __name__ == '__main__':
    main()

#!/usr/bin/env python3

import sys

# Functions

def process_commands(commands):
    position, depth, aim = 0, 0, 0

    for direction, magnitude in commands:
        magnitude = int(magnitude)

        if direction == 'down':
            aim += magnitude
        elif direction == 'up':
            aim -= magnitude
        elif direction == 'forward':
            position += magnitude
            depth    += aim * magnitude

    return position, depth

# Main Execution

def main():
    commands        = [line.split() for line in sys.stdin]
    position, depth = process_commands(commands)
    print(position * depth)

if __name__ == '__main__':
    main()

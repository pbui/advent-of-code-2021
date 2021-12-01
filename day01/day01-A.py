#!/usr/bin/env python3

import sys

# Functions

def count_depth_increases(depths):
    depth_increases = 0
    previous_depth  = depths.pop(0)

    while depths:
        current_depth = depths.pop(0)
        if current_depth > previous_depth:
            depth_increases += 1
        previous_depth = current_depth

    return depth_increases

# Main Execution

def main():
    report    = [int(depth) for depth in sys.stdin]
    increases = count_depth_increases(report)
    print(increases)

if __name__ == '__main__':
    main()

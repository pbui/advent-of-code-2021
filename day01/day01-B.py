#!/usr/bin/env python3

import collections
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

def group_windows(depths, length=3):
    windows        = []
    current_window = collections.deque(maxlen=length)

    while depths:
        current_depth = depths.pop(0)
        current_window.append(current_depth)

        if len(current_window) == 3:
            windows.append(sum(current_window))

    return windows

# Main Execution

def main():
    report    = [int(depth) for depth in sys.stdin]
    windows   = group_windows(report)
    increases = count_depth_increases(windows)
    print(increases)

if __name__ == '__main__':
    main()

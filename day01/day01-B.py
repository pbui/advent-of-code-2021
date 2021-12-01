#!/usr/bin/env python3

import sys

# Constants

WINDOW = 3

# Main Execution

def main():
    report    = [int(depth) for depth in sys.stdin]
    increases = sum(1 for i in range(WINDOW, len(report)) if report[i] > report[i - WINDOW])
    print(increases)

if __name__ == '__main__':
    main()

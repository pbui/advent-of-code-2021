#!/usr/bin/env python3

import sys

# Main Execution

def main():
    report    = [int(depth) for depth in sys.stdin]
    windows   = [sum(report[i:i+3]) for i in range(0, len(report) - 2)]
    increases = sum(
        1 for i in range(1, len(windows)) if windows[i] > windows[i - 1]
    )
    print(increases)

if __name__ == '__main__':
    main()

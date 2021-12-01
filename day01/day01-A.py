#!/usr/bin/env python3

import sys

# Main Execution

def main():
    report    = [int(depth) for depth in sys.stdin]
    increases = sum(
        1 for i in range(1, len(report)) if report[i] > report[i - 1]
    )
    print(increases)

if __name__ == '__main__':
    main()

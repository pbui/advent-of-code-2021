#!/usr/bin/env python3

import sys

# Constants

SEGMENTS_COUNT_TO_DIGIT = {
    2 : 1,
    4 : 4,
    3 : 7,
    7 : 8,
}

# Functions

def count_1478_outputs(outputs):
    return sum(1 if len(output) in SEGMENTS_COUNT_TO_DIGIT else 0 for output in outputs)

# Main Execution

def main():
    count_1478_digits = 0

    for entry in sys.stdin:
        patterns, outputs  = entry.split('|')
        patterns           = patterns.split()
        outputs            = outputs.split()
        count_1478_digits += count_1478_outputs(outputs)

    print(f'Part A: {count_1478_digits}')

if __name__ == '__main__':
    main()

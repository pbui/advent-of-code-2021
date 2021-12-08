#!/usr/bin/env python3

import collections
import sys

# Functions

def search_patterns(patterns, condition):
    for pattern in patterns:
        if condition(pattern):
            patterns.remove(pattern)
            return pattern

def patterns_with_length(patterns, length):
    return [set(pattern) for pattern in patterns if len(pattern) == length]

def determine_mapping(patterns):
    # Base sets
    one    = patterns_with_length(patterns, 2)[0]
    four   = patterns_with_length(patterns, 4)[0]
    seven  = patterns_with_length(patterns, 3)[0]
    eight  = patterns_with_length(patterns, 7)[0]

    # Sets of length 5: 2, 3, 5
    fives  = patterns_with_length(patterns, 5)
    two    = search_patterns(fives, lambda p: p | four == eight)
    three  = search_patterns(fives, lambda p: len(p - one) == 3)
    five   = fives[0]
    
    # Sets of length 6: 0, 6, 9
    sixes  = patterns_with_length(patterns, 6)
    zero   = search_patterns(sixes, lambda p: p | five == eight)
    six    = search_patterns(sixes, lambda p: p | seven == eight)
    nine   = sixes[0]

    # Construct mapping
    sets   = [zero, one, two, three, four, five, six, seven, eight, nine]
    return {frozenset(s) : str(d) for d, s in enumerate(sets)}

def process_entry(patterns, outputs):
    patterns = list(map(set, patterns.split()))
    outputs  = list(map(frozenset, outputs.split()))
    mapping  = determine_mapping(patterns)
    display  = ''.join(mapping[output] for output in outputs)
    return int(display)

# Main Execution

def main():
    total = sum(process_entry(*line.split('|')) for line in sys.stdin)
    print(f'Part B: {total}')

if __name__ == '__main__':
    main()

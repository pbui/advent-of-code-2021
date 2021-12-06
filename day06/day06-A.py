#!/usr/bin/env python3

import collections
import sys

# Constants

MAX_DAYS  = 256 # Part A: 80
RESET_DAY = 6
BIRTH_DAY = 8

# Functions

def simulate_day(fish_table):
    new_table = collections.defaultdict(int)
    for remaining, count in fish_table.items():
        new_table[remaining - 1] = count

    if -1 in new_table:
        new_table[RESET_DAY] += new_table[-1]
        new_table[BIRTH_DAY] += new_table[-1]
        del new_table[-1]

    return new_table

# Main Execution

def main():
    fish_table = collections.Counter(map(int, sys.stdin.readline().split(',')))

    for _ in range(MAX_DAYS):
        fish_table = simulate_day(fish_table)

    print(sum(fish_table.values()))

if __name__ == '__main__':
    main()

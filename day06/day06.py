#!/usr/bin/env python3

import collections
import sys

# Constants

MAX_DAYS  = 256 # Part A: 80
RESET_DAY = 6
BIRTH_DAY = 8

# Functions

def simulate_day(old_table):
    newborns = old_table[BIRTH_DAY]
    resets   = old_table[0] + old_table[RESET_DAY + 1]
    births   = old_table[0]
    return [*old_table[1:RESET_DAY + 1], resets, newborns, births]

def simulate_days(table, days = MAX_DAYS):
    for _ in range(days):
        table = simulate_day(table)
    return sum(table)

# Main Execution

def main():
    fish_table = [0]*(BIRTH_DAY + 1)
    for fish in map(int, sys.stdin.readline().split(',')):
        fish_table[fish] += 1

    print(f'Sample: {simulate_days(fish_table[:], 18)}')
    print(f'Part A: {simulate_days(fish_table[:], 80)}')
    print(f'Part B: {simulate_days(fish_table[:], 256)}')

if __name__ == '__main__':
    main()

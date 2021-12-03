#!/usr/bin/env python3

import sys

# Functions

def count_columns(report):
    counts = [0]*len(report[0])
    for number in report:
        for index, digit in enumerate(number):
            counts[index] += int(digit)
    return counts

# Main Execution

def main():
    report  = [line.strip() for line in sys.stdin]
    counts  = count_columns(report)
    gamma   = int(''.join(['1' if count > len(report)//2 else '0' for count in counts]), 2)
    epsilon = int(''.join(['1' if count < len(report)//2 else '0' for count in counts]), 2)
    print(gamma * epsilon)

if __name__ == '__main__':
    main()

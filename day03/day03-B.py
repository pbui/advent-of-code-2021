#!/usr/bin/env python3

import sys

# Functions

def count_columns(report):
    counts = [0]*len(report[0])
    for number in report:
        for index, digit in enumerate(number):
            counts[index] += int(digit)
    return counts

def most_common(counts, total):
    return ''.join(['1' if 2*count >= total else '0' for count in counts])

def least_common(counts, total):
    return ''.join(['1' if 2*count <  total else '0' for count in counts])

def filter_numbers(report, aggregator):
    index = 0

    while len(report) > 1:
        counts = count_columns(report)
        common = aggregator(counts, len(report))
        report = [number for number in report if number[index] == common[index]]
        index += 1

    return int(report[0], 2)

# Main Execution

def main():
    report = [line.strip() for line in sys.stdin]
    oxygen = filter_numbers(report, most_common)
    carbon = filter_numbers(report, least_common)
    print(oxygen * carbon)

if __name__ == '__main__':
    main()

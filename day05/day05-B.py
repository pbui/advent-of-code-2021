#!/usr/bin/env python3

import re
import sys

# Constants

LINE_RX   = r'([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)'
GRID_ROWS = 1000
GRID_COLS = 1000

# Functions

def read_lines(stream=sys.stdin):
    return [list(map(int, re.match(LINE_RX, line).groups())) for line in stream]

def make_grid(rows=GRID_ROWS, cols=GRID_COLS):
    return [[0 for _ in range(rows)] for _ in range(cols)]

def dump_grid(grid):
    for row in grid:
        print(''.join(map(str, row)))

def place_line_in_grid(line, grid):
    x1, y1, x2, y2 = line
    
    if x1 == x2:    # Vertical
        dx = 0
        dy = 1 if y1 < y2 else -1
    elif y1 == y2:  # Horizontal
        dx = 1 if x1 < x2 else -1
        dy = 0
    else:           # Diagonal
        dx = 1 if x1 < x2 else -1
        dy = 1 if y1 < y2 else -1

    grid[y1][x1] += 1
    while x1 != x2 or y1 != y2:
        x1 += dx
        y1 += dy
        grid[y1][x1] += 1

def count_overlaps(grid):
    return sum(sum(1 for cell in row if cell >= 2) for row in grid)

# Main Execution

def main():
    lines = read_lines()
    grid  = make_grid()

    for line in lines:
        place_line_in_grid(line, grid)

    overlaps = count_overlaps(grid)
    print(overlaps)

if __name__ == '__main__':
    main()

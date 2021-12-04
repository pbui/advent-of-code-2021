#!/usr/bin/env python3

import sys

# Constants

ROWS = 5
COLS = 5
MARK = -1

# Functions

def read_boards():
    while sys.stdin.readline():
        try:
            yield [list(map(int, sys.stdin.readline().split())) for _ in range(ROWS)]
        except (IOError, ValueError):
            break

def mark_board(board, number):
    for rindex, row in enumerate(board):
        for cindex, cell in enumerate(row):
            if cell == number:
                board[rindex][cindex] = MARK

def check_board(board):
    return any(sum(row) == ROWS * MARK for row in board) or \
           any(sum(board[row][col] for row in range(ROWS)) == COLS * MARK for col in range(COLS))

def dump_board(board):
    for row in board:
        print(' '.join(map(str, row)))

def sum_board(board):
    return sum(
        sum(number for number in row if number >= 0) for row in board
    )

# Main Execution

def main():
    numbers = [int(n) for n in sys.stdin.readline().split(',')]
    boards  = list(read_boards())
    winner  = None

    while numbers and boards:
        number = numbers.pop(0)

        active = []
        for board in boards:
            mark_board(board, number)
            if check_board(board):
                winner = board
            else:
                active.append(board)
        boards = active

    total = sum_board(winner)
    print(number*total)

if __name__ == '__main__':
    main()

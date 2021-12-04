import fs from "fs";

type Board = { num: number, marked: boolean}[][];

// parse input
const raw = fs.readFileSync("./day4.txt");

const [drawRaw, ...boardsRaw] = raw.toString().trim().split("\n\n");

const draw = drawRaw.split(',').map(Number);

const boards = boardsRaw.map<Board>((raw) =>
  raw
    .split('\n')
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((num) => ({
          num: Number(num),
          marked: false,
        }))));

// part 1 + 2 combined

const completedBoards: number[] = [];

for (const number of draw) {
  for (let i = 0; i < boards.length; i ++) {
    const board = boards[i];
    if (completedBoards.includes(i)) {
      continue;
    }

    markBoard(board, number);

    if (boardComplete(board)) {
      // if first completed board
      if (completedBoards.length === 0) {
        console.log("part 1", scoreBoard(board) * number);
      }
      completedBoards.push(i);

      // if last completed board
      if (completedBoards.length === boards.length) {
        console.log("part 2", scoreBoard(board) * number);
        process.exit();
      }
    }
  };
}



// marks off value `number` on the board if it exists
// assumes a number can only appear on a line once
function markBoard(board: Board, number: number): void {
  board.forEach((line) => {
    const find = line.find(({ num }) => num === number);

    if (find) {
      find.marked = true;
    }
  });
}

function boardComplete(board: Board): boolean {
  // is horizontal complete
  let complete = board.some((line) => line.every(({ marked }) => marked));
  if (complete) {
    return true;
  }

  // is vertical complete
  for (let i = 0; i < board[0].length; i++) {
    complete = board.every((line) => {
      return line[i].marked;
    });
    if (complete) {
      return true
    }
  }

  return false;
}

function scoreBoard(board: Board): number {
  return board.reduce((acc1, line) =>
    acc1 + line.reduce((acc2, { marked, num}) =>
      marked ? acc2 : acc2 + num,
    0),
  0);
}

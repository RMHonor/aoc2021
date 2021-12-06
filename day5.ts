import fs from "fs";

// parse input
const raw = fs.readFileSync("./day5.txt");

type Coordinate = { x: number; y: number };

type Instruction = [from: Coordinate, to: Coordinate];

const instructions = raw
  .toString()
  .trim()
  .split("\n")
  .map<Instruction>((line) => {
    const [from, to] = line.split(' -> ');

    const fromCoord: Coordinate = {
      x: +from.split(',')[0],
      y: +from.split(',')[1],
    };

    const toCoord: Coordinate = {
      x: +to.split(',')[0],
      y: +to.split(',')[1],
    };

    return [fromCoord, toCoord];
  });

// part 1

const result1: number[][] = [];

for (const [from, to] of instructions) {
  const yDirection = from.y < to.y ? 1 : -1;

  if (from.x != to.x && from.y != to.y) {
    continue;
  }

  for (let y = from.y; y != to.y + yDirection; y += yDirection) {
    if (!result1[y]) {
      result1[y] = [];
    }
    const xDirection = from.x < to.x ? 1 : -1;
    for (let x = from.x; x != to.x + xDirection; x += xDirection) {
      if (result1[y][x]) {
        result1[y][x] += 1;
      } else {
        result1[y][x] = 1;
      }
    }
  }
}

const dangerPoints1 = result1.reduce((count, row) => count +row.filter((val) => val >= 2).length, 0);

console.log("part 1", dangerPoints1);

// part 2

const result2: number[][] = [];

for (const [from, to] of instructions) {

  // handle diagonals
  if (from.x != to.x && from.y != to.y) {
    const yDirection = from.y < to.y ? 1 : -1;
    const xDirection = from.x < to.x ? 1 : -1;
    for (let y = from.y, x = from.x; (y != to.y + yDirection) && (x != to.x + xDirection); y += yDirection, x += xDirection) {
      if (!result2[y]) {
        result2[y] = [];
      }
      if (result2[y][x]) {
        result2[y][x] += 1;
      } else {
        result2[y][x] = 1;
      }
    }
  } else {
    const yDirection = from.y < to.y ? 1 : -1;
    for (let y = from.y; y != to.y + yDirection; y += yDirection) {
      if (!result2[y]) {
        result2[y] = [];
      }
      const xDirection = from.x < to.x ? 1 : -1;
      for (let x = from.x; x != to.x + xDirection; x += xDirection) {
        if (result2[y][x]) {
          result2[y][x] += 1;
        } else {
          result2[y][x] = 1;
        }
      }
    }
  }
}

const dangerPoints2 = result2.reduce((count, row) => count +row.filter((val) => val >= 2).length, 0);

console.log("part 2", dangerPoints2);

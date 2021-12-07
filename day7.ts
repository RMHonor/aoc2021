import fs from "fs";

const raw = fs.readFileSync("./day7.txt");

const positions = raw.toString().trim().split(",").map(Number);

// part 1

// calculate fuel required to move to each possible positions
const fuel1: number[] = [];
for (let target = Math.min(...positions); target <= Math.max(...positions); target += 1) {
  fuel1.push(positions.reduce((acc, next) => acc + Math.abs(target - next), 0));
}

console.log("part 1", Math.min(...fuel1));

// part 2

// calculate fuel required to move to each possible positions
const fuel2: number[] = [];
for (let target = Math.min(...positions); target <= Math.max(...positions); target += 1) {
  fuel2.push(positions.reduce((acc, next) => {
    const distance = Math.abs(target - next);
    // calculate triangle number
    const fuelRequired = (distance * (distance + 1)) / 2
    return acc + fuelRequired;
  }, 0));
}

console.log("part 2", Math.min(...fuel2));


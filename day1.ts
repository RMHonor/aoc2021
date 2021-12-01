import fs from "fs";

const raw = fs.readFileSync("./day1.txt");
const depths = raw.toString().split("\n").map(Number);

// part 1

const increases = depths.filter((depth, i) => depth > depths[i - 1]).length;

console.log('part 1:', increases);

// part 2

// remove last 2 elements from array
const clone = [...depths];
clone.pop();
clone.pop();

const windows = clone.map((_, i) => depths[i] + depths[i + 1] + depths[i + 2]);

const increases2 = windows.filter((window, i) => window > windows[i - 1]).length;

console.log('part 2:', increases2);

import fs from "fs";

const raw = fs.readFileSync("./day8.txt");

const lines = raw.toString().trim().split("\n");

// part 1: filter signals with a unique length segment count

// unique number of segments
const uniqueSegmentCount = [2, 4, 3, 7]; // 1, 4, 7, 8

const signals = lines
  .map((l) => l.split(' | ')[1].split(' '))
  .flat();

const uniqueLengthSignals = signals.filter((s) => uniqueSegmentCount.includes(s.length));

console.log("part 1", uniqueLengthSignals.length);

// part 2

const input = lines
  .map((l) =>
    l
      .split(' | ')
      .map((part) => part.split(' ')
        .map((v) => v.split('').sort().join(""))
      )
  )

let sum = 0;
let fail = 0;

for (const line of input) {
  // signal to number map
  const signals: Record<number, string> = {
    // get input for know numbers
    1: line[0].find((signal) => signal.length === 2)!,
    4: line[0].find((signal) => signal.length === 4)!,
    7: line[0].find((signal) => signal.length === 3)!,
    8: line[0].find((signal) => signal.length === 7)!,
  }

  // the signal for a 6 doesn't include both letters from 1 and is length 6
  signals[6] = line[0]
    .filter((signal) => signal.length === 6)
    .find((signal) => {
      return !signals[1].split('').every((char) => signal.includes(char));
    })!;

  // the signal for a 5 overlaps with 6
  signals[5] = line[0]
    .filter((signal) => signal.length === 5)
    .find((signal) => signal.split("").every((char) => signals[6].includes(char)))!;

  // the signal for a 9 overlaps with 5
  signals[9] = line[0]
    .filter((signal) => signal.length === 6 && signal !== signals[6])
    .find((signal) => signals[5].split('').every((char) => signal.includes(char)))!;

  // the signal for a 0 is the one with length 6 that isn't 6 or 9
  signals[0] = line[0]
    .find((signal) => signal.length === 6 && signal !== signals[9] && signal !== signals[6])!;

  // the signal for a 3 is the one with length 5 and including both chars from a 1
  signals[3] = line[0]
    .filter((signal) => signal.length === 5)
    .find((signal) => signals[1].split('').every((char) => signal.includes(char)))!;

  // the signal for a 2 is the one of length 5, and not 2 or 3
  signals[2] = line[0]
    .find((signal) => signal.length === 5 && signal !== signals[3] && signal !== signals[5])!;

  // invert map
  const signalToNumber: Record<string, string> = {};

  Object.entries(signals).forEach(([key, value]) => {
    signalToNumber[value] = key;
  })

  // calculate number
  const result = line[1].reduce((acc, next) => {
    return acc + signalToNumber[next];
  }, "");

  if (new Set(Object.values(signalToNumber)).size !== 10) {
    fail += 1;
    console.log(signalToNumber)
  }

  sum += Number(result);
}

console.log(fail);
console.log("part 2", sum);

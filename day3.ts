import fs from "fs";

const raw = fs.readFileSync("./day3.txt");
const bits = raw.toString().trim().split("\n");

// part 1

const mostCommonBits = [];
const leastCommonBits = [];

for (let i = 0; i < 12; i++) {
  const [zeroes, ones] = bits.reduce(([zeroes, ones], bits) => {
    if (bits[i] === "1") {
      return [zeroes, ones += 1];
    } else {
      return [zeroes += 1, ones];
    }
  }, [0, 0]);

  if (zeroes > ones) {
    mostCommonBits.push("0");
    leastCommonBits.push("1");
  } else {
    mostCommonBits.push("1");
    leastCommonBits.push("0");
  }
}

const gamma = parseInt(mostCommonBits.join(""), 2);
const epsilon = parseInt(leastCommonBits.join(""), 2);

console.log("part 1", gamma * epsilon)

// part 2

let numbers = [...bits];

let o2 = -1;

for (let i = 0; i < 12; i++) {
  const [zeroes, ones] = numbers.reduce(([zeroes, ones], bits) => {
    if (bits[i] === "1") {
      return [zeroes, ones += 1];
    } else {
      return [zeroes += 1, ones];
    }
  }, [0, 0]);

  const mostCommonBit = ones >= zeroes ? "1" : "0";

  numbers = numbers.filter((bit) => bit[i] === mostCommonBit);

  if (numbers.length === 1) {
    o2 = parseInt(numbers[0], 2);
    break;
  }
}

numbers = [...bits];
let co2 = -1;

for (let i = 0; i < 12; i++) {
  const [zeroes, ones] = numbers.reduce(([zeroes, ones], bits) => {
    if (bits[i] === "1") {
      return [zeroes, ones += 1];
    } else {
      return [zeroes += 1, ones];
    }
  }, [0, 0]);

  const leastCommonBit = ones >= zeroes ? "0" : "1";

  numbers = numbers.filter((bit) => bit[i] === leastCommonBit);

  if (numbers.length === 1) {
    co2 = parseInt(numbers[0], 2);
    break;
  }
}

console.log("part 2", o2 * co2);

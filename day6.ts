import fs from "fs";

const raw = fs.readFileSync("./day6.txt");

// part 1

const fish1 = raw.toString().trim().split(",").map(Number);

for (let i = 0; i < 80; i++) {
  // capture length at start before we mutate array
  const length = fish1.length;

  for (let j = 0; j < length; j++) {
    if (fish1[j] === 0) {
      fish1.push(8);
      fish1[j] = 6;
    } else {
      fish1[j] -= 1;
    }
  }
}

console.log("part 1", fish1.length);

// part 2

// part 2 is problematic if brute forcing, because we quickly run out of memory


const fish2 = raw.toString().trim().split(",").map(Number);

type FishCount = Record<`day${number}`, number>;

let fishCounts: FishCount = {
  day1: fish2.filter((f) => f === 0).length,
  day2: fish2.filter((f) => f === 1).length,
  day3: fish2.filter((f) => f === 2).length,
  day4: fish2.filter((f) => f === 3).length,
  day5: fish2.filter((f) => f === 4).length,
  day6: fish2.filter((f) => f === 5).length,
  day7: fish2.filter((f) => f === 6).length,
  day8: 0,
  day9: 0,
};

for (let i = 0; i < 256; i++) {
  // capture length at start before we mutate array
  let newFishCounts: FishCount = {};

  newFishCounts.day9 = fishCounts.day1;
  newFishCounts.day8 = fishCounts.day9;
  newFishCounts.day7 = fishCounts.day8 + fishCounts.day1;
  newFishCounts.day6 = fishCounts.day7;
  newFishCounts.day5 = fishCounts.day6;
  newFishCounts.day4 = fishCounts.day5;
  newFishCounts.day3 = fishCounts.day4;
  newFishCounts.day2 = fishCounts.day3;
  newFishCounts.day1 = fishCounts.day2;

  fishCounts = newFishCounts;
}

console.log("part 2", fishCounts.day1 + fishCounts.day2 + fishCounts.day3 + fishCounts.day4 + fishCounts.day5 + fishCounts.day6 + fishCounts.day7 + fishCounts.day8 + fishCounts.day9);

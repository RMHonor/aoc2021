import fs from "fs";

const raw = fs.readFileSync("./day2.txt");

type Command = "forward" | "up" | "down";
type Instruction = [Command, number];

const instructions: readonly Instruction[] = raw.toString().trim().split("\n").map((line) => {
  const [instruction, value] = line.split(" ");

  return [instruction as Command, Number(value)];
});

// part 1

let finalPosition = instructions.reduce((acc, [command, amount]) => {
  switch (command) {
    case 'up':
      return {
        horizontal: acc.horizontal,
        vertical: acc.vertical - amount
      };
    case 'down':
      return {
        horizontal: acc.horizontal,
        vertical: acc.vertical + amount
      };
    case 'forward':
      return {
        horizontal: acc.horizontal + amount,
        vertical: acc.vertical,
      };
  }
}, { horizontal: 0, vertical: 0 });

console.log("part 1", finalPosition.vertical * finalPosition.horizontal);

// part 2

finalPosition = instructions.reduce((acc, [command, amount]) => {
  switch (command) {
    case 'up':
      return {
        horizontal: acc.horizontal,
        vertical: acc.vertical,
        aim: acc.aim - amount,
      };
    case 'down':
      return {
        horizontal: acc.horizontal,
        vertical: acc.vertical,
        aim: acc.aim + amount,
      };
    case 'forward':
      return {
        horizontal: acc.horizontal + amount,
        vertical: acc.vertical + (acc.aim * amount),
        aim: acc.aim,
      };
  }
}, { horizontal: 0, vertical: 0, aim: 0 });

console.log("part 1", finalPosition.vertical * finalPosition.horizontal);

//   /dev/stdin
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let number = input.shift();
for (let i = 0; i < number; i++) {
  let str = input[i].replace(/\r/g, "");
  let arr = str.split(" ").reverse();
  console.log(`Case #${i + 1}: ${arr.join(" ")}`);
}

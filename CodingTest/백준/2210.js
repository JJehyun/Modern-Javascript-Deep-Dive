// example.txt
// /dev/stdin
// 2210번
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = inputs.map((v) => v.split(" ").map(Number));
const answer = [];
const dir = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    solve(i, j, "");
  }
}
function solve(x, y, str) {
  if (str.length == 6) {
    answer.push(str);
    return;
  } else {
    dir.forEach((n) => {
      const [a, b] = n;
      if (x + a >= 0 && x + a < 5 && y + b >= 0 && y + b < 5) {
        solve(x + a, y + b, str + input[x + a][y + b]);
      }
    });
  }
}
console.log([...new Set(answer)].length);

// example.txt
// /dev/stdin
// 1388번
const fs = require("fs");
const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [B, C] = n.split(" ").map((n) => +n);
const room = arr.map((n) => n.split(""));
let answer = 0;

for (let i = 0; i < BR; i++) {
  let flag = true;
  for (let j = 0; j < C; j++) {
    if (flag == true && room[i][j] == "-") {
      answer++;
      flag = false;
    } else if (room[i][j] == "|") {
      flag = true;
    }
  }
}
for (let i = 0; i < C; i++) {
  let flag = true;
  for (let j = 0; j < B; j++) {
    if (flag == true && room[j][i] == "|") {
      answer++;
      flag = false;
    } else if (room[j][i] == "-") {
      flag = true;
    }
  }
}
console.log(answer);

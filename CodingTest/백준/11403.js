// 11403번
// example.txt
// /dev/stdin
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 정점의 갯수
let number = input.shift();
let arr = [];
for (let item of input) {
  arr.push(item.split(" ").map(Number));
}
for (let k = 0; k < number; k++) {
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
      if (arr[i][k] && arr[k][j]) arr[i][j] = 1;
    }
  }
}
for (let i = 0; i < number; i++) {
  console.log(arr[i].join(" "));
}

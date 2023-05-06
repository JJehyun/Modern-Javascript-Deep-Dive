///dev/stdin
//"example.txt"
const fs = require("fs");
//백준 제출 할 때 주석 제거
// const readFileSyncAddress = "./dev/stdin";

// VSC 테스트 할때 주석 제거
const readFileSyncAddress = "example.txt";

// 4,3,6,8,7,5,2
const input = fs
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");
// 4,3,6,8,7,5,2
let len = input.shift();
//현재 값
let now = 1;
let stack = [];
let result = [];
//반복문
for (let i = 0; i < len; i++) {
  while (input[i] >= now) {
    stack.push(now);
    result.push("+");
    ++now;
  }
  let number = stack.pop();
  if (number !== Number(input[i])) {
    result.push("NO");
    break;
  }
  result.push("-");
}
result.indexOf("NO") !== -1
  ? console.log("NO")
  : console.log(result.join("\n"));

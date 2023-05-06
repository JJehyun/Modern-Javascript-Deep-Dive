///dev/stdin
//"example.txt"
const fs = require("fs");
//백준 제출 할 때 주석 제거
// const readFileSyncAddress = "./dev/stdin";

// VSC 테스트 할때 주석 제거
const readFileSyncAddress = "example.txt";
// 큐란 먼저 들어온 데이터가 먼저 나가는 것
const input = fs
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\r\n");

let len = Number(input[0]);
let stack = [];
let result = [];
for (let i = 1; i <= len; i++) {
  input[i].split(" ")[0];
  switch (input[i].split(" ")[0]) {
    case "push":
      //출력X
      stack.push(input[i].split(" ")[1]);
      break;
    case "pop":
      //맨뒤의 값 출력 OR -1
      result.push(stack.shift() || -1);
      break;
    case "size":
      //지금가지 스택 출력
      result.push(stack.length);
      break;
    case "empty":
      //스택 비어있으면 0 or 1
      result.push(stack[0] ? 0 : 1);
      break;
    case "front":
      //스택 맨앞의 값 출력 or -1
      result.push(stack[0] || -1);
      break;
    case "back":
      //스택 맨 마지막 값 출력 or -1
      result.push(stack[stack.length - 1] || -1);
      break;
  }
}
console.log(result.join("\n"));

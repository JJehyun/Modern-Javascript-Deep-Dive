//   /dev/stdin
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("");
let stack = [];
let count = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] == "(") {
    stack.push(input[i]);
  } else if (input[i] == ")") {
    if (stack.length == 0 && input[i - 1] == "(") {
      stack.pop();
    }
  } else {
    count += 1;
  }
}

if (stack) {
  count += stack.length;
}

console.log(count);

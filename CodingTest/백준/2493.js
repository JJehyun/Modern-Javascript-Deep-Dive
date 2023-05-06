let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");
let len = Number(input[0]);
let top = input[1].split(" ");
let stack = [];
let answer=new Array(len).fill(0);
for (let i = len - 1; i >= 0; i--) {
  if (stack.length != 0 && parseInt(top[stack[stack.length - 1]]) < parseInt(top[i])) {
    while(parseInt(top[stack[stack.length - 1]]) < parseInt(top[i])){
      let x=stack.pop();
      answer[x]=i+1;
    }
  }
  stack.push(i);
}
console.log(answer.join(' '));
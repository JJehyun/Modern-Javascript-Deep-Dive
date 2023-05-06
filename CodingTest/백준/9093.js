///dev/stdin
//"example.txt"
const array = require("fs").readFileSync("/dev/stdin").toString().split("\r\n");
array.shift();
for (let i = 0; i < array.length; i++) {
  const stack = [];
  const len = array[i].split(" ").length;
  const word = array[i].split(" ");
  for (let j = 0; j < len; j++) {
    stack.push(word[j].split("").reverse().join(""));
  }
  console.log(stack.join(" "));
}

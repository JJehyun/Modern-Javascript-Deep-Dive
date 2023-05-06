// example.txt
// /dev/stdin
// 10973
const fs = require("fs");
let input = fs.readFileSync(/dev/stdin).toString().trim().split("\n");
const N = Number(input[0]);
let numbers = [];
for (let i = 1; i <= N; i++) numbers.push(i); 
let listn = input[1].split(" ").map((i) => Number(i)); 
let sortNumbers = [...numbers].sort((a, b) => a - b); 
if (listn.every((num, index) => num === sortNumbers[index])) console.log(-1);
else {
  let i = N - 2;
  while (listn[i] < listn[i + 1]) i--;
  let j = N - 1;
  while (listn[i] < listn[j]) j--;
  [listn[i], listn[j]] = [listn[j], listn[i]];
  let rest = listn.slice(i + 1); 
  rest.sort((a, b) => b - a); 
  let answer = [...listn.slice(0, i + 1), ...rest]; 
  console.log(answer.join(" "));
}

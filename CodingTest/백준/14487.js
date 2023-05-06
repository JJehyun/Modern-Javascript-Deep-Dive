//example.txt
///dev/stdin
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
let spot = Number(input[0])
let arr = input[1].split(" ").map(Number).sort((a,b)=>a-b)
arr.pop();
let answer = arr.reduce((acc,cur) => acc + cur , 0);
console.log(answer)
const fs = require('fs');
let input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
input.shift();
input = input.map((v) => v.split(' ').map(Number));
input[0].sort((a, b) => a - b);
input[1].sort((a, b) => b - a);
let answer = 0;

input[0].filter((v, idx) => {
  answer += v * input[1][idx];
});

console.log(answer);
//   /dev/stdin
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
input.shift();
const ropes = input.map(Number)
const SortRopes = ropes.sort((a,b)=> a-b);
const arr = [];

for(let i=0; i < N; i++){
    arr.push(SortRopes[i] * (N-i));
}
console.log(Math.max(...arr))
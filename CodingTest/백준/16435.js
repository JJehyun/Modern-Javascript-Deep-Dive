//   /dev/stdin
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let [n, snake] =input[0].split(' ').map(Number)
let arr = input[1].split(' ').map(Number)
let SortArr = arr.sort((a,b)=>a-b);
for (item of SortArr) {
    if(snake >= item){
        snake += 1
    } 
  }
console.log(snake)
//example
///dev/stdin
//우유 축제
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
let store = Number(input[0])
let arr = input[1].split(' ').map(Number)
let count = 0;
arr.forEach((element, index, arr) =>{
    if(element == (count % 3)) count ++
})
console.log(count)
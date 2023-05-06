//example
///dev/stdin
let fs = require('fs');
let input = fs.readFileSync('example.txt').toString().split('\n');
let arr = input[1].split(' ').map(Number)
arr.sort((a,b)=>b-a)
let i = 0;
console.log(arr)
let arr2 = [];
while(true){
    arr2.push(arr[i])
    i++
}

//푸는 중
// 1일
// 4 ,
// 1일
// 3, 3 
// 1일
// 2 , 2, 3
// 1일
// 1 , 1, 2 , 2 
// 1일
// 0 , 0 , 1 , 1
// 1일 
// 0 , 0 , 0 , 0
// 1일

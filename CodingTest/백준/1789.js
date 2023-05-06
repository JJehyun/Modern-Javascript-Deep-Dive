//   /dev/stdin
//    example.txt
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const number = Number(input[0]);
let count = 0
let i = 0
    while(true){
        i++
        count += i
        if(number<count)
            break;
    }
    console.log(i-1)
//11/30
const fs = require('fs');
input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let max = Number(input[0].replace(/5/g,'6')) +  Number(input[1].replace(/5/g,'6'))
let min = Number(input[0].replace(/6/g,'5')) +  Number(input[1].replace(/6/g,'5'))
console.log(min+" "+max)


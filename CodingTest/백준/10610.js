//   /dev/stdin
//    example.txt
const fs = require('fs');
let input = fs.readFileSync("/dev/stdin").toString().trim();

if(!input.split('').includes('0')){
    console.log(-1);
}
else{
    let arrTemp = input.split('').map(e => parseInt(e))
    let sumOfInput = arrTemp.reduce((acc,v)=>acc+v)
    if(sumOfInput % 3 == 0){
        arrTemp.sort((a,b)=>b-a)
        console.log(arrTemp.join(""))
    }
    else{
        console.log(-1);
    }
}
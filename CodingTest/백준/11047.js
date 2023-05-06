//   /dev/stdin

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let [nk ,...arr] = input
let [n,price] = nk.split(' ').map(Number)
let Sortarr=arr.sort((a,b)=>b-a).map(Number)
let count = 0;
for(i=0; i<=n; i++){
    if(price/Sortarr[i] >= 1){
        count += parseInt(price/Sortarr[i])
        price = price - (parseInt(price/Sortarr[i]) * Sortarr[i])
    }
}
console.log(count)
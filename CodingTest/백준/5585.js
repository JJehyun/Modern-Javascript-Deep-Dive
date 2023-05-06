const money = parseInt(require("fs").readFileSync("/dev/stdin").toString());
let change = 1000 - money;
let count = 0;
const coins = [500, 100, 50, 10, 5, 1];
for (let i=0; i<coins.length; i++) {
    let quo = Math.floor(change / coins[i]);
    change -= quo * coins[i];
    count += quo;
}
console.log(count);
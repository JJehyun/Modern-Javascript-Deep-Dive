const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);

input.shift();

input.sort((a, b) => {
if (a > b) {
  return 1;
} else {
  return -1;
}
});
for (k of input) {
console.log(k);
}
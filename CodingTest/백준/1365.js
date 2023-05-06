let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const poles = input[1].split(" ").map(Number);

let arrays = [poles[0]];
let answer = 0;

function BinarySearch(num) {
  let lt = 0;
  let rt = arrays.length - 1;
  while (lt <= rt) {
    let mid = parseInt((lt + rt) / 2);
    if (arrays[mid] === num) return mid;
    else if (arrays[mid] > num) rt = mid - 1;
    else lt = mid + 1;
  }

  return lt;
}

for (let pole of poles) {
  if (arrays[arrays.length - 1] < pole) {
    arrays.push(pole);
  } else {
    arrays[BinarySearch(pole)] = pole;
  }
}
answer = N - arrays.length;
console.log(answer);

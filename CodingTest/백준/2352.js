//example.txt
// /dev/stdin
// 2252
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = Number(input[0]);
const points = input[1].split(" ").map(Number);
let arrays = [points[0]];
function Search(num) {
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
for (let item of points) {
  if (item > arrays[arrays.length - 1]) arrays.push(item);
  else {
    let idx = Search(item);
    arrays[idx] = item;
  }
}
console.log(String(arrays.length));

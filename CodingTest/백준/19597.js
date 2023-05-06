//   /dev/stdin
//    example.txt
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [n, ...times] = input;
n = +n;
times = times.map((i) => {
  return { start: i.split(" ")[0], end: i.split(" ")[1] };
});
function solution(n, times) {
  let bang = 0;
  let max = 0;
  const stime = times.map((time) => {
    return { time: +time.start, isStart: 1 };
  });
  const etime = times.map((time) => {
    return { time: +time.end, isStart: -1 };
  });
  const sortedTimes = [...stime, ...etime].sort((a, b) =>
    a.time === b.time ? a.isStart - b.isStart : a.time - b.time
  );

  sortedTimes.forEach((time) => {
    bang = time.isStart === 1 ? bang + 1 : bang - 1;
    if (max <= bang) max = bang;
  });
  return max;
}
console.log(solution(n, times));

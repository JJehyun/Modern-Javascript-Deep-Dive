// example.txt
// dev/stdin
const fs = require("fs");
const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +n;
let dp = arr.map((v) => v.split(" ").map((v) => +v));
for (let i = 1; i < N; i++) {
  dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2]);
  dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2]);
  dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1]);
}
const answer = Math.min(...dp[N - 1]);

console.log(answer);

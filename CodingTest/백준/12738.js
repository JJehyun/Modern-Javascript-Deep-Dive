//   /dev/stdin
//   .example.txt
var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

var n = input[0] / 1;
if (n > 1) {
  var sequence = input[1].split(" ").map((element) => element / 1);
  var d = Array(n).fill(1);
  var answer = 0;
  d[0] = 1;
  for (var i = 1; i < n; i++) {
    var currentElement = sequence[i];
    var cnt = 0;
    for (var j = 0; j < i; j++) {
      if (currentElement > sequence[j]) {
        cnt = Math.max(cnt, d[j]);
      }
    }
    d[i] += cnt;
    answer = Math.max(answer, d[i]);
  }
  console.log(answer);
} else {
  console.log(1);
}

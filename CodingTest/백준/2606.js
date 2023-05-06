let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let n = Number(input.shift());
let m = Number(input.shift());

let graph = [...new Array(n + 1)].map(() => []);
let visited = new Array(n + 1).fill(false);
let ans = 0;
visited[1] = true;

const dfs = (i) => {
  graph[i].map((ele) => {
    if (!visited[ele]) {
      visited[ele] = true;
      ans += 1;
      dfs(ele);
    }
  });
};

input.map((i) => {
  const [s, d] = i.split(" ").map((ele) => Number(ele));
  graph[s].push(d);
  graph[d].push(s);
});

dfs(1);

console.log(ans);

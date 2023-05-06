// example.txt
// /dev/stdin
// 12 / 30
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +input.shift();
const [first, seocond] = input.shift().split(" ");
const m = +input.shift();
const relations = input.reduce((acc, v) => {
  const [parent, child] = v.split(" ");
  if (!acc[parent]) acc[parent] = [child];
  else acc[parent].push(child);
  if (!acc[child]) acc[child] = [parent];
  else acc[child].push(parent);

  return acc;
}, {});

const dfs = (start, target) => {
  const visited = Array(n + 1).fill(false);
  visited[start] = true;
  const stack = [[start, 0]];
  while (stack.length) {
    const [person, deep] = stack.pop();
    if (person === target) return deep;
    if (relations[person]) {
      relations[person].forEach((next) => {
        if (!visited[next]) {
          visited[next] = true;
          stack.push([next, deep + 1]);
        }
      });
    }
  }
  return -1;
};

console.log(dfs(first, seocond));

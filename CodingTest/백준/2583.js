const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [M, N, K] = input[0].split(" ").map(Number);
const paper = [...Array(M)].map(() => Array(N).fill(false));

for (let i = 1; i <= K; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
  for (let y = M - y2; y < M - y1; y++) {
    for (let x = x1; x < x2; x++) {
      paper[y][x] = true;
    }
  }
}

const offset = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
const dfs = (start) => {
  const stack = [start];
  let count = 0;
  while (stack.length) {
    const [x, y] = stack.pop();
    count++;
    for (let i = 0; i < 4; i++) {
      const nx = x + offset[i][0];
      const ny = y + offset[i][1];
      if (nx >= 0 && nx < M && ny >= 0 && ny < N && !paper[nx][ny]) {
        paper[nx][ny] = true;
        stack.push([nx, ny]);
      }
    }
  }
  return count;
};

const areas = [];
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!paper[i][j]) {
      paper[i][j] = true;
      areas.push(dfs([i, j, 0]));
    }
  }
}

console.log(areas.length);
console.log(areas.sort((a, b) => a - b).join(" "));

///dev/stdin
//example.txt
//이문제는 무조건 readline를 이용해서 풀어야함, fs 사용시 무조건 런타임 에러
const solution = (N, milkInfo) => {
    milkInfo.sort((a, b) => b - a);
  
    let freeMilk = 0;
  
    for (let i = 2; i < N; i += 3) {
      freeMilk += milkInfo[i];
    }
    milkInfo = milkInfo.reduce((pre, cur) => pre + cur);
    console.log(milkInfo - freeMilk);
  };
  
  const readline = require("readline");
  
  (async () => {
    let rl = readline.createInterface({ input: process.stdin });
    let N = null;
    let count = 0;
    const milkInfo = [];
  
    for await (const line of rl) {
      if (!N) {
        N = +line;
      } else {
        milkInfo.push(+line);
        count += 1;
      }
      if (N === count) {
        rl.close();
      }
    }
    solution(N, milkInfo);
    process.exit();
  })();
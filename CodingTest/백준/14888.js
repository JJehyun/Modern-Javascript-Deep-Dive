const fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const num = input[1].split(' ').map(v=>+v);
let operator = input[2].split(' ').map(v=>+v);
let min = 1000000000;
let max = -1000000000;
//init
function solution(cnt,val){
    const originVal = val;
    if(cnt==input[0]-1){
        if(val>max) max=val;
        if(val<min) min=val;
        return;
    }else{
        for(let i = 0; i<4; i++){
            if(operator[i]>0){
                switch(i){
                    case 0:
                        val+=num[cnt+1];
                    break;
                    case 1:
                        val-=num[cnt+1];
                    break;
                    case 2:
                        val*=num[cnt+1];
                    break;
                    case 3:
                        if(val>=0){
                            val = Math.floor(val/num[cnt+1])
                        }else{
                            val = Math.floor((-1)*val/num[cnt+1])
                            if(val>0) val = val*(-1);
                        }
                    break;
                }
               
                operator[i]--;
                dfs(cnt+1,val)
                val = originVal;
                operator[i]++;
            }
        }
    }
    return ;
}
solution(0,num[0]);
console.log(`${max}\n${min}`);
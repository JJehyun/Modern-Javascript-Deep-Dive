function solution(gems) {
    let answer = [0,0];
    let answerLen = gems.length+1;
    const gemTypes = [... new Set(gems).keys()];
    const gemTypesLen = gemTypes.length;
    const gemsIdxMap = new Map();
    gemTypes.map(g => gemsIdxMap.set(g, 0));
    if(gemTypes.length===1) return [1, 1];
    else if(gemTypes.length === gems.length) return [1, gems.length];
    for(let i=0; i<gems.length; i++){
        gemsIdxMap.set(gems[i], i+1);
        let idxs = [...gemsIdxMap.values()];
        if(idxs.indexOf(0) === -1){
            idxs.sort((a,b) => a-b);
            let tempAnswer = [idxs.shift(), idxs.pop()];
            let tempAnswerLen = tempAnswer[1]-tempAnswer[0];
            if(tempAnswerLen === gemTypesLen-){
                return tempAnswer;
            } else if(answerLen > tempAnswerLen){
                answer = tempAnswer.slice();
                answerLen = tempAnswerLen;
            }
        }   
    }
    return answer;
}
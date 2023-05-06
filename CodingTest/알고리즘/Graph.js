//Graph관련 (비선형 자료구조)(지하철 노선도)

//javascript Graph 구현 방법(2차원 배열 생성) 인접행렬 구현 1
const graph = Array.from(Array(5),()=>Array(5).fill(false));

graph[0][1] = true // 0->1 연결 
graph[0][3] = true // 0->3 연결
graph[2][4] = true // 2->4 연결

/*
*  ( | 시작 정점 ㅡ 행 도착 정점 )
*____________________
*|__|_O_|___|_O_|___|   ---> 0 -> 1 // 0->4 연결됨
*|__|___|___|___|_O_|   ---> 1 -> 4 연결
*|__|___|___|___|___|
*|__|___|___|___|___| 
*|__|___|___|___|___|
*/


//javascript Graph 구현 방법(인접 리스트 구현 방법) 2
const graph2 = Array.from(Array(5),()=>[]); // [[],[],[],[],[]]
graph2[0].push(1)  //  0 -> 1 연결
graph2[1].push(2)  //  1 -> 2 연결
graph2[3].push(1)  //  3 -> 1 연결
//[ [ 1 ], [ 2 ], [], [ 1 ], [] ]


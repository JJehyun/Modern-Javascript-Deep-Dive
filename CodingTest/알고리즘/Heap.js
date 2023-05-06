//Heap 이진트리의 구조 , 요소가 삭제,삽입될 때 바로 정렬됨
//우선 순위가 높은 것을 root로 지정 root가 가장 먼저 나감 , root가 가장큰값이 Max heap , root가 가장 작은 min Heap존재

//heap알고리즘은 자바스크립트에서 직접구현해야함

class MaxHeap{
    constructor(){
        this.heap = [null];
    }
    //prototype
    //값 삽입
    push(value){
        this.heap.push(value);//삽입
        let currentIndex = this.heap.length - 1         //현재 인덱스
        let parentIndex = Math.floor(currentIndex/2)    

        while (parentIndex !==0 &&this.heap[parentIndex] < value) { //제일 큰값을 root로 옮기는 과정
            const temp = this.heap[parentIndex];        
            this.heap[parentIndex] = value              
            this.heap[currentIndex] = temp              // 부모노드값을 현재 인덱스에 삽입

            currentIndex = parentIndex;                 //부모인덱스를 현재인덱스로 변경
            parentIndex = Math.floor(currentIndex / 2)  //부모인덱스값 다시 설정
        }
    }


    //값 삭제
    pop(){
        const returnValue = this.heap[1]
        this.heap[1] = this.heap.pop();     //요소 제거

        //우선 순위 맨위로 올리기
        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        while(
            this.heap[currentIndex] < this.heap[leftIndex] ||       //상위 노드보다 값이 낮을 때 까지 반복
            this.heap[currentIndex] < this.heap[rightIndex]
        ){
            if(this.heap[leftIndex] < this.heap[rightIndex]){
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[rightIndex];
                this.heap[rightIndex] = temp;
                currentIndex = rightIndex;
            }else {
                const temp = this.heap[currentIndex];
                this.heap[currentIndex] = this.heap[leftIndex];
                this.heap[leftIndex] = temp;
                currentIndex = leftIndex;
            }
            //하위 노드 인덱스 수정
            leftIndex = currentIndex *2;
            rightIndex = currentIndex * 2 +1;
        }
    }

}

const heap = new MaxHeap();
heap.push(22)
heap.push(33)

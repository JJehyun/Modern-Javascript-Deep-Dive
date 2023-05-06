//배열로 구현
class Queue {
    constructor(){
        this.queue = [];
        this.front = 0; //맨앞 인덱스
        this.rear = 0;  //맨뒤 인덱스
    }

        //prototype
        //큐 값 추가
        enqueue(value){
            this.queue[this.rear++] = value;
            console.log(this.queue)
        }
        //앞에 있는 큐 가져오는 함수
        dequeue(){
            const value = this.queue[this.front];
            delete this.queue[this.front];
            this.front += 1;
            return value;
        }
        //맨앞의 값을 알아내는 함수
        peek(){
            return this.queue[this.front]
        }
        //큐의 길이 가져오기
        size(){
            return this.rear - this.front;
        }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);


//연결리스트로 큐 구현
class Node2{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
class Queue2{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(newValue){
        const newNode = new Node(newValue);
        if(this.head === null){
            this.head = this.tail = newNode;
        }else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size += 1;
    }
    dequeue(){
        const value = this.head.value;
        this.head = this.head.next;
        this.size -=1;
        return value;
    }
    peek(){
        return this.head.value
    }
}

//문제
class Node {
    constructor(value){
        this.value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    //값 추가를 위한 함수
    enqueue(newValue){
        const newNode = new Node(newValue);
        if(this.head === null){
            this.head = this.tail =newNode;
            console.log(this.head)
        }else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    //값을 제거하는 함수s
    dequeue(){
        const value = this.head.value
        this.head = this.head.next
        return value;
    }

    //현재 head의 값을 가져오는 함수
    peek(){
        return this.head.value
    }
}


function solution(priorities,location){
    const queue = new Queue();
    for(let i = 0; i < priorities.length;i+=1){
        queue.enqueue([priorities[i],i]);
    }
    priorities.sort((a,b)=> b-a);

    let count = 0;
    while(true){
        const currentValue = queue.peek();
        if(currentValue[0] < priorities[count]){
            queue.enqueue(queue.dequeue());
        }else{
            const value = queue.dequeue();
            count +=1;
            if(location === value[1]){
                return count 
            }
        }
    }
}

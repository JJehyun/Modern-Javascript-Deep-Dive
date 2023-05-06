class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack{
    constructor(){
        this.top = null;
        this.size = 0;
    }
    //prototype
    //push 기능 구현
    push(value){
        const node = new Node(value)
        node.next = this.top    
        this.top = node;
        console.log(node)
        this.size +=1;
    }
    //pop 기능 구현
    pop(){
        const value = this.top.value;
        this.top = this.top.next;
        this.size -= 1;
        return value;
    }
    //배열.Length 구현
    size(){
        return this.size;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
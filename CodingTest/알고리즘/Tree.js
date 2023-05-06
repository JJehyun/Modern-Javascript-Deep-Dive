//연결 리스트 이진 트리 구현
//이진 트리 자바스크립트 구현
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(node){
        this.root = node;
    }
    //prototype 
    structor(){
        const queue = new Queue();
        queue.enqueue(this.root);
        while(queue.size){
            const currentNode = queue.dequeue();
            if(currentNode.left) queue.enqueue(currentNode.left)
            if(currentNode.right) queue.enqueue(currentNode.right)
        }
    }
}


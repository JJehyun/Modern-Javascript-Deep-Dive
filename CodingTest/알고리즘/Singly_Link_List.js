class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList{
    constructor(){
        //노드 끼리 연결해주는 역할
        this.head = null;
        this.tail = null;
    }

    //prototype 
    find(value) {
        let currNode = this.head;
        //값을 찾을 때까지 순회
        while (currNode.value !== value){ 
            currNode = currNode.next;
        }
        return currNode;
    }
    //노드값 끝부분 추가 로직
    append(newValue){
        const newValue = new Node(newValue);
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    //연결 리스트 중간에 값 추가 로직
    insert(node,newValue){
        const newNode = new Node(newNode);
        newNode.next = node.next;
        node.next = newNode;
    }
    //연결 리스트 값 제거 로직 
    remove(value){
        let preNode = this.head;
        //이전 노드 찾기
        while (preNode.next.value !== value){
            preNode = preNode.next;
        }
        //이전노드에서 다음의 다음을 찾도록 수정
        if(preNode.next !== null){
            preNode.next = preNode.next.next;
        }
    }

}


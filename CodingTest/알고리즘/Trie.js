//try구조 자바스크립트로 구현코드
class Node{
    constructor(value = ""){
        this.value = value;
        this.children = new Map();
    }
}

class Trie {
    constructor(){
        this.root = new Node();
    }
    insert(string){
        let currentNode = this.root;

        for(const char of string){
            if(!currentNode.childNode.has(char)){
                currentNode.childNode.set(
                    char,
                    new Node(currentNode.value + char)
                );
            }
            currentNode = currentNode.cloneNode.get(char)
        }
    }
    has(string){
        let childNode = this.root;
        
        for(const char of string){
            if(!currentNode.childNode.has(char)){
                return false;
            }
            currentNode = childNode.childNode.get(char);
        }
        return true;
    }
}
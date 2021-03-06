class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    // create new node 
    let newNode = new this.Node(element);

    // new node's next is the old head
    newNode.next = this._head();

    // new node's prev is sentinel
    newNode.prev = this._sentinel;

    // old head's prev is new node
    this._head().prev = newNode;
    
    // sentinel's next is new node
    this._sentinel.next = newNode;

    return newNode;
  }

  insertTail(element) {
    // create new node 
    let newNode = new this.Node(element);

    // new node's next is sentinel 
    newNode.next = this._sentinel;

    // new node's previous is old tail
    newNode.prev = this._tail();

    // old tail's next is new node 
    this._tail().next = newNode;

    // sentinel's previous is new tail
    this._sentinel.prev = newNode;

    return newNode;

  }

  removeHead() {
    // // make sentinal's next be head.next
    // this._sentinel.next = this._head.next;

    // // head next .previous is now sentinal
    // this._head.next.prev = this._sentinel;

    // make old head inactive 
    return this._head().remove();
  }

  removeTail() {
    // this._sentinel.prev = this._tail.prev;

    // this.tail.prev.next = this._sentinel;

    return this._tail().remove();
  }

  remove(node) {
    let currNode = this._head;
    while (currNode != node) {
      currNode = node.next;
    }
    let beforeCurr = currNode.prev;
    let afterCurr = currNode.next;

    beforeCurr.next = afterCurr;
    afterCurr.prev = beforeCurr;

    currNode.remove();
  }

  forEach(callback) {

    let currNode = this._head();
    let i = 0;
    while (currNode !== this._sentinel) {
      callback(currNode.element, i, this);
      i += 1;
      currNode = currNode.next;
    }
  }

  count() {
    let count = 0;
    while (this._head.next != this._tail)
    {
      count += 1;
    }

    return count;
  }
}

export default DoublyLinkedList;
class PriorityQueue {
  
  constructor () {
    this.queue = [];
    this.comparator = (a, b) => a.priority - b.priority
  }

  get size() {
    return this.queue.length - 1
  }

  enque(task) {
    this.queue.push(task)
    this.queue.sort(this.comparator)
  }

  deque() {
    return this.queue.shift()
  }
}

const array = [150, 80, 141, 30, 200];
const pq = new PriorityQueue();

function sortArray(array) {
  console.log(array)
}


pq.enque({task: sortArray, priority: 3, data: array });
pq.enque({task: "print something", priority: 1});
pq.enque({task: "Greeting", priority: 2 });

console.log(pq)

for (let i = pq.size; i >= 0; i-- ) {
  const task = pq.deque();
  console.log(task)
}
// The data structure used for this implementation is a priority queue, 
// the elements of the priority queue are supposed to have some sort of priority property
// so they can be sorted upon insertion
// but for this case we only need a priority queue specific to our usage where the elements are 
// going to be nodes, and the nodes can be sorted according to their distance property

function PriorityQueue(){

    this.nodes = [];
    this.enqueue = node => {
        // we need to figure out where to insert it;
        
        for (var i = 0; i < this.nodes.length; i++) { 
            if (this.nodes[i].distance < node.distance) { 
                this.nodes.splice(i, 0, node); 
                break; //if found break; 
                // if it did not find, it would still get to the end so item will be added last
            } 
        }
        this.nodes.push(node); 
    }
    this.pop = () => {
        if (this.isEmpty()){
            return false;
        } 
        return this.nodes.shift();
    }
    this.isEmpty = () => {
        return !(this.nodes.length);
    }
}

var pQueue = new PriorityQueue();
var distance = new Array (graph.rows);
 
for (let i=0; i<distance.length; i++) {
    distance[i] = new Array(graph.columns).fill(Infinity);
}

function dijkstra () {
    frameRate(20)
    if (!pQueue.isEmpty() && loop) {
        let front = pQueue.pop();
 
        if (front.distance <= distance[front.i][front.j]) {
            for (let neighbour of front.neighbours ) {
                if(neighbour.isObstacle) continue;
                if (distance[front.i][front.j] + neighbour.distance < distance[neighbour.i][neighbour.j]){
                    distance[neighbour.i][neighbour.j] = distance[front.i][front.j] + neighbour.distance;
                    neighbour.parent = front;
                        if (neighbour === destination) {
                            loop = false;
                            break;
                        }
                    neighbour.isVisited = true
                    neighbour.isEmpty = false;
                    pQueue.enqueue(neighbour);
                }
            }
        }
    }
    else {
        frameRate(10)
        parent = destination.parent;
        if (parent === parent.parent) {
            noLoop();
            console.log(path);
            return path
        }
        path.push(parent);
        console.log(parent, "parent");
        parent.inPath = true;
        parent.isEmpty= false;
        console.log(destination, "here")
        destination = parent;
    }
}
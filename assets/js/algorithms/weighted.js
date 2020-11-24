// The data structure used for this implementation is a priority queue, 
// the elements of the priority queue are supposed to have some sort of priority property
// so they can be sorted upon insertion
// but for this case we only need a priority queue specific to our usage where the elements are 
// going to be nodes, and the nodes can be sorted according to their 'f' property
// in case of A*, f is equal to d + h, because heuristic (h value) is used
// in case of Dijkstra, f is equal to d, because no h value is used

function PriorityQueue() {

    this.nodes = [];
    this.enqueue = (node, dijkstra) => {
        // we need to figure out where to insert it;
        let inserted = false;
        let comparison;

        for (let i = 0; i < this.nodes.length; i++) {

            if (dijkstra) {
                comparison = node.distance < this.nodes[i].distance;
            } else {
                comparison = node.f < this.nodes[i].f
            }
            if (comparison) {
                this.nodes.splice(i, 0, node);
                inserted = true;
                break; // if found break
            }
        }
        if (!inserted) this.nodes.push(node);
    }
    this.pop = () => {
        if (this.isEmpty()) {
            return false;
        }
        return this.nodes.shift();
    }
    this.isEmpty = () => {
        return !(this.nodes.length);
    }
}

var pQueue = new PriorityQueue();
var distance = new Array(graph.rows);
for (let i = 0; i < distance.length; i++) {
    distance[i] = new Array(graph.columns).fill(Infinity);
}


let cont2 =true;
let running = true;
function weightedSearch(frameRate1, frameRate2, dijkstra) {
    frameRate(frameRate1)
    if (!pQueue.isEmpty() && cont2) {
        let front = pQueue.pop();

        if (front.distance <= distance[front.i][front.j]) {
            for (let neighbour of front.neighbours) {
                if (neighbour.isObstacle) continue;
                if (distance[front.i][front.j] + neighbour.distance < distance[neighbour.i][neighbour.j]) {
                    distance[neighbour.i][neighbour.j] = distance[front.i][front.j] + neighbour.distance;
                    neighbour.parent = front;
                    if (neighbour === destination) {
                        cont2 = false;
                        break;
                    }
                    neighbour.isVisited = true
                    neighbour.isEmpty = false;
                    pQueue.enqueue(neighbour, dijkstra);
                }
            }
        }
    } else {
        frameRate(frameRate2)
        parent = destination.parent;
        if (parent === parent.parent) {
            running = false;
            return path
        }
        path.push(parent);
        destination = parent;
    }
}
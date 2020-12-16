// The data structure used for this implementation is a priority queue, 
// the elements of the priority queue are supposed to have some sort of priority property
// so they can be sorted upon insertion
// but for this case we only need a priority queue specific to our usage where the elements are 
// going to be nodes, and the nodes can be sorted according to their 'f' property
// in case of A*, f is equal to d + h, because heuristic (h value) is used
// in case of Dijkstra, f is equal to d, because no h value is used

class PriorityQueue {
    constructor() {

        this.nodes = [];
        this.enqueue = (node, dijkstra) => {
            // we need to figure out where to insert it;
            let inserted = false;
            let comparison;

            for (let i = 0; i < this.nodes.length; i++) {

                if (dijkstra) {
                    comparison = node.distance < this.nodes[i].distance;
                } else {
                    comparison = node.f < this.nodes[i].f;
                }
                if (comparison) {
                    this.nodes.splice(i, 0, node);
                    inserted = true;
                    break; // if found break
                }
            }
            if (!inserted)
                this.nodes.push(node);
        };
        this.pop = () => {
            if (this.isEmpty()) {
                return false;
            }
            return this.nodes.shift();
        };
        this.isEmpty = () => {
            return !(this.nodes.length);
        };
    }
}

function weightedSearch(pQueue, graph , frameRate1, frameRate2, dijkstra) {
    frameRate(frameRate1)
    var destination = graph.endNode;
    if (!pQueue.isEmpty() && cont) {
        let front = pQueue.pop();
        if (front.distance <= graph.distances[front.i][front.j]) {
            for (let neighbour of front.neighbours) {
                if (neighbour.isObstacle) continue;
                if (graph.distances[front.i][front.j] + neighbour.distance 
                        < graph.distances[neighbour.i][neighbour.j]) {
                    graph.distances[neighbour.i][neighbour.j] = 
                        graph.distances[front.i][front.j] + neighbour.distance;
                        
                    neighbour.parent = front;
                    if (neighbour === destination) {
                        cont = false;
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
        console.log(running);
        let parent;
        do {
            parent = destination.parent;
            destination = parent;
            graph.path.push(parent);
        } while (parent !== parent.parent )
        running = false;
        cont = true;
        return graph.path;
    }
}

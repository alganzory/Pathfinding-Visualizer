// this module contains the data structures and algorithms required
// for unweighted pathfinding algorithms, currently including:
// Breadth-First Search (BFS)



class Queue {
    constructor() {
        this.nodes = [];
        this.push = node => {
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

var queue = new Queue();

function bfs(frameRate1, frameRate2) {

    frameRate(frameRate1)
    if (!queue.isEmpty() && cont) {
        let currentNode = queue.pop();
        if (currentNode === destination) {
            cont = false;
        }
        depth = currentNode.depth;
        currentNode.isVisited = true;
        currentNode.isEmpty = false;
        currentNode.draw(0);
        for (let neighbour of currentNode.neighbours) {
            if (neighbour.depth === -1 && !neighbour.isObstacle) {
                neighbour.depth = currentNode.depth + 1;
                neighbour.parent = currentNode;
                queue.push(neighbour);
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
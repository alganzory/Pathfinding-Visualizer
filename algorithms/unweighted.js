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

function bfs(queue, graph, frameRate1, frameRate2) {

    frameRate(frameRate1) // framerate of the drawing
    var destination = graph.endNode;
    if (!queue.isEmpty() && cont) {
        let currentNode = queue.pop();
        if (currentNode === destination) {
            cont = false;
            
        }
        depth = currentNode.depth;
        currentNode.isVisited = true; //mark the node as visited to avoid revisiting it
        currentNode.isEmpty = false;

        for (let neighbour of currentNode.neighbours) {
            if (neighbour.depth === -1 && !neighbour.isObstacle) {
                neighbour.depth = currentNode.depth + 1;
                neighbour.parent = currentNode;
                queue.push(neighbour);
            }
        }
    } else {
        frameRate(frameRate2) // change framerate when drawing the solution
        console.log(running);
        let parent;
        do { //adding the path nodes to the path array
            parent = destination.parent;
            destination = parent;
            graph.path.push(parent);
        } while (parent !== parent.parent )
        running = false;
        cont = true;
        return graph.path;
    }
}
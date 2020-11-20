function Queue () {
    this.nodes= [];
    this.push = node => {
        this.nodes.push (node);
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


function bfs () {
    
    frameRate(20)
    if (!queue.isEmpty() && loop) {
        let currentNode = queue.pop();
        if (currentNode === destination) {
            loop = false;
        }
        depth = currentNode.depth;
        currentNode.isVisited = true;
        currentNode.isEmpty = false;
        currentNode.draw(0);
        for (let neighbour of currentNode.neighbours) {
            if (neighbour.depth === -1 && !neighbour.isObstacle){
                neighbour.depth = currentNode.depth+1;
                neighbour.parent = currentNode;
                queue.push(neighbour);
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
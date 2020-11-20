 const rows = 20;
 const columns = 20;
 const gridLength = 300; //in pixels


function Graph () {
    this.rows = rows;
    this.columns = columns;
    
    this.nodeLength = gridLength/rows;
    
    this.startNode;

    this.endNode;

    this.obstacleNodes = []
    this.grid = new Array (this.rows);
 
    for (let i=0; i<this.grid.length; i++) {
        this.grid[i] = new Array(this.columns);
    }

    this.setStartNode = (node) => {
        this.startNode = node;
        this.startNode.isSource = true;
        this.startNode.isDestination = false;
        this.startNode.isObstacle = false;
        this.startNode.isEmpty = false;
    }

    this.setEndNode = (node) => {
        this.endNode = node;
        this.endNode.isSource = false;
        this.endNode.isDestination = true;
        this.endNode.isObstacle = false;
        this.endNode.isEmpty = false;
    }


    this.addObstacleNode = (node) => {
        node.isSource = false;
        node.isDestination = false;
        node.isObstacle = true;
        node.isEmpty = false;
        this.obstacleNodes.push (node)
    }


}
var graph = new Graph();
    
// populating the grid with the nodes
for (let i = 0; i < graph.grid.length; i++) {
    for (let j = 0; j < graph.grid[i].length; j++) {
        graph.grid[i][j] = new Node (i,j);        
    }
}

// adding the neighbours for every node
for (let i = 0; i < graph.grid.length; i++) {
    for (let j = 0; j < graph.grid[i].length; j++) {
        // up
        if (i > 0)
        graph.grid[i][j].neighbours.push(graph.grid[i-1][j]);
        // left 
        if (j > 0)
        graph.grid[i][j].neighbours.push(graph.grid[i][j-1]);
        // right 
        if (j < columns -1)
        graph.grid[i][j].neighbours.push(graph.grid[i][j+1]);
        // down
         if (i < rows -1)
         graph.grid[i][j].neighbours.push(graph.grid[i+1][j]);
        // top right
        if (i > 0 && j < columns -1)
        graph.grid[i][j].neighbours.push(graph.grid[i-1][j+1]);
        // bottom right
        if (i < rows -1 && j < columns -1)
        graph.grid[i][j].neighbours.push(graph.grid[i+1][j+1]);
        // top left
        if (i > 0 && j > 0)
        graph.grid[i][j].neighbours.push(graph.grid[i-1][j-1]);
        // bottom left       
        if ( i < rows -1 && j > 0) 
        graph.grid[i][j].neighbours.push(graph.grid[i+1][j-1]);

    }
}

 function Node (i,j) {

    // location and id
    this.i  = i;
    this.j = j;
    this.x = j*graph.nodeLength;
    this.y = i*graph.nodeLength;

    this.neighbours = []; 

    // flags
    this.isSource = false;
    this.isDestination = false;
    this.isObstacle = false;
    this.isEmpty = true;
    this.isVisited = false;
  

    // info for algorithms:
    this.depth = -1;
    this.parent = this;
    this.inPath = false;

    this.distance= 1; // dijkstra and A* 
    this.h; // A*
    this.f; // A*

    this.draw = () => {
        if (this.isObstacle) {
            fill('#808080');
        } else if (this.isSource) {
            fill('red');
        } else if (this.isDestination) {
    
            fill("#6617CB");
        } else if (this.isEmpty) {
            fill(255)
        } else if (this.isVisited && !this.inPath) {
            fill('#b6ffea')    
        }
        else if (this.inPath){
            fill ("#CB218E")
        }
        rect(this.x, this.y, graph.nodeLength,graph.nodeLength);
    }

}

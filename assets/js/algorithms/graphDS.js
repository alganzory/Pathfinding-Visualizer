 const rows = 6;
 const columns = 6;
 const gridLength = 300; //in pixels


function Graph () {
    this.rows = rows;
    this.columns = columns;
    this.nodeLength = gridLength/rows;
    
    this.startNode = { //arbitrary initial values
        i:1,
        j:1
    }
    this.endNode = { //arbitrary initial values
        i:4,
        j:4,
    }

    this.obstacleNodes = []
    this.grid = new Array (this.rows);
 
    for (let i=0; i<this.grid.length; i++) {
        this.grid[i] = new Array(this.columns);
    }

    this.setStartNode = (i,j) => {
        this.startNode = {
            i:i,
            j:j
        }
        this.grid[i][j].isSource = true;
        this.grid[i][j].isDestination = false;
        this.grid[i][j].isObstacle = false;
        this.grid[i][j].isEmpty = false;
    }

    this.setEndNode = (i,j) => {
        this.endNode = {
            i:i,
            j:j
        }
        this.grid[i][j].isSource = false;
        this.grid[i][j].isDestination = true;
        this.grid[i][j].isObstacle = false;
        this.grid[i][j].isEmpty = false;
    }

    this.setEndNode = (i,j) => {
        this.endNode = {
            i:i,
            j:j
        }
        this.grid[i][j].isSource = false;
        this.grid[i][j].isDestination = true;
        this.grid[i][j].isObstacle = false;
        this.grid[i][j].isEmpty = false;
    }

    this.addObstacleNode = (i,j) => {
        this.obstacleNodes.push ({
            i:i,
            j:j
        })
        this.grid[i][j].isSource = false;
        this.grid[i][j].isDestination = false;
        this.grid[i][j].isObstacle = true;
        this.grid[i][j].isEmpty = false;
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
    
    this.draw = fillColor => {
        if (this.isObstacle) {
            fill(100);
        } else if (this.isSource) {
            fill('red');
        } else if (this.isDestination) {
            colorMode(HSB);
            fill(255, 204, 100);
        } else {
            fill(255)
        }  

        console.log (this.x, this.y)
        console.log (graph.nodeLength)
        rect(this.x, this.y, graph.nodeLength,graph.nodeLength);
    }
}

var graph = new Graph();

// populating the grid with the nodes
for (let i = 0; i < graph.grid.length; i++) {
    for (let j = 0; j < graph.grid[i].length; j++) {
        graph.grid[i][j] = new Node (i,j);        
    }
}

for (let i = 0; i < graph.grid.length; i++) {
    for (let j = 0; j < graph.grid[i].length; j++) {
        graph.grid[i][j].neighbours = 
        graph.grid.filter (function (node) {

            node !== graph.grid[i][j] //can't be its own neighbour
            && ( 
            node.j === j && node.i ===i-1|| //up
            node.j === j && node.j ===i+1|| //down
            node.i === i && node.j ===j-1|| //left 
            node.i === i && node.j ===j+1|| //right
            node.i === i-1 && node.j ===j-1|| //top left
            node.i === i-1 && node.j ===j+1|| //top right
            node.i === i+1 && node.j ===j-1|| //bottom left
            node.i === i+1 && node.j ===j+1 //bottom right
            )
        })
        
    }
    
}
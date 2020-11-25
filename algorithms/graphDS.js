class Graph {
    constructor(rows, columns, gridLength) {
        this.rows = rows;
        this.columns = columns;

        this.nodeLength = gridLength / rows;
        this.nodeWidth = gridLength/ columns;
        this.startNode;

        this.endNode;

        this.obstacleNodes = [];
        this.grid = new Array(this.rows);
        this.distances = new Array(this.rows);
        this.path = [];

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.columns);
            this.distances[i] = new Array(this.columns).fill(Infinity);
        }
       
        for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    this.grid[i][j] = new Node(i, j,this.nodeLength,this.nodeWidth);
                }
        }
    
    }

    setNodesData = ( endNode) => {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.grid[i][j].addNeighbours();
                this.grid[i][j].h = Math.hypot((this.grid[i][j].x - endNode.x), (this.grid[i][j].y - endNode.y));
                this.grid[i][j].f = this.grid[i][j].h + this.grid[i][j].distance;
                
            }
        }
    }
    setStartNode = (node) => {
        if (this.startNode) {
            this.startNode.emptyNode();
        }
        this.startNode = node;
        this.startNode.isSource = true;
        this.startNode.isDestination = false;
        this.startNode.isObstacle = false;
        this.startNode.isEmpty = false;
    };

    setEndNode = (node) => {
        if (this.endNode) {
            this.endNode.emptyNode();
        }
        this.endNode = node;
        this.endNode.isSource = false;
        this.endNode.isDestination = true;
        this.endNode.isObstacle = false;
        this.endNode.isEmpty = false;
    };


    addObstacleNode = (node) => {
        node.isSource = false;
        node.isDestination = false;
        node.isObstacle = true;
        node.isEmpty = false;
        this.obstacleNodes.push(node);
    };
    
}

 class Node {
    constructor(i, j,nodeLength,nodeWidth) {

        // location and id
        this.i = i;
        this.j = j;
        this.x = j * nodeLength;
        this.y = i * nodeWidth;

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

        this.distance = 1; // dijkstra and A* 
        this.h; // A*
        this.f; // A*        

    }

    draw = () => {
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
        rect(this.x, this.y, graph.nodeLength,graph.nodeWidth);
    }

    addNeighbours = () => {
        let i = this.i;
        let j = this.j;
        // up
        if (i > 0)
            this.neighbours.push(graph.grid[i - 1][j]);
        // left 
        if (j > 0)
            this.neighbours.push(graph.grid[i][j - 1]);
        // right 
        if (j < columns - 1)
            this.neighbours.push(graph.grid[i][j + 1]);
        // down
        if (i < rows - 1)
            this.neighbours.push(graph.grid[i + 1][j]);
        // top right
        if (i > 0 && j < columns - 1)
            this.neighbours.push(graph.grid[i - 1][j + 1]);
        // bottom right
        if (i < rows - 1 && j < columns - 1)
            this.neighbours.push(graph.grid[i + 1][j + 1]);
        // top left
        if (i > 0 && j > 0)
            this.neighbours.push(graph.grid[i - 1][j - 1]);
        // bottom left       
        if (i < rows - 1 && j > 0)
            this.neighbours.push(graph.grid[i + 1][j - 1]);
    };

    emptyNode = () => {
        this.isSource = false;
        this.isDestination = false;
        this.isObstacle = false;
        this.isEmpty = true;
        this.isVisited = false;
    };
}

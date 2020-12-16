class Graph {
    constructor(rows, columns,startNode, endNode, gridLength) {
        this.rows = rows;
        this.columns = columns;

        this.nodeWidth = Math.floor(gridLength / columns);
        this.nodeHeight = Math.floor(gridLength/ rows);
        
        this.grid =[];
        this.startNode;
        this.endNode;
        this.obstacleNodes= [];
    
        this.distances= [];
        this.path= [];
        this.setGrid (startNode,endNode);
    }

    clearSolution= () => {
        this.distances = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.distances[i] = new Array(this.columns).fill(Infinity);
        }
        this.path = [];
        this.grid.forEach(row =>
            row.forEach(node => {
                node.resetNode();
        }))
        
    }

    setGrid = (startNode,endNode) => {
        this.grid = new Array(this.rows);
        this.distances = new Array(this.rows);
        this.path = [];

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.columns);
            this.distances[i] = new Array(this.columns).fill(Infinity);
        }
    
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.grid[i][j] = new Node(i, j,this.nodeWidth,this.nodeHeight);
            }
        }
        this.setStartNode(this.grid[startNode.i][startNode.j]);
        this.setEndNode(this.grid[endNode.i][endNode.j])
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
    constructor(i, j,nodeWidth,nodeHeight) {

        // location and id
        this.i = i;
        this.j = j;
        this.x = j * nodeWidth;
        this.y = i * nodeHeight;

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
            fill('#8c8593');
        } else if (this.isSource) {
            fill('red');
        } else if (this.isDestination) {
            fill("#7206E2");
        } else if (this.isEmpty) {
            fill(255)
        } else if (this.isVisited && !this.inPath) {
            fill('#d3fff4')    
        }
        else if (this.inPath){
            fill ("#27dbb1")
        }
        rect(this.x, this.y, graph.nodeWidth,graph.nodeHeight);
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
        this.isDestination = false;
        this.isSource = false;
        this.isObstacle = false;
        this.isEmpty = true;
    }

    resetNode = () => {
        this.isVisited = false;
        this.inPath = false;
        this.depth = -1;
        this.parent = this;
        this.distance = 1; 
        this.h;
        this.f;    
    }
}


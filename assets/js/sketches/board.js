var source;
var destination;
var parent;
var path = [];

function setup() {

    // setting up board
    var canvas = createCanvas(gridLength, gridLength);
    background(255);
    canvas.parent('board-holder');
    stroke('#981BA3');
    strokeWeight(2);
    //=================================
    
    // example problems
    graph.setStartNode(graph.grid[8][7]);
    graph.setEndNode(graph.grid[13][9]);
    graph.addObstacleNode(graph.grid[9][7])
    graph.addObstacleNode(graph.grid[9][8])
    graph.addObstacleNode(graph.grid[10][9])
    
    //=================================
    // User Choices
    source = graph.startNode;
    destination = graph.endNode;
    algorithm = 'A-star';

    // BFS
    source.depth = 0;
    queue.push(source);

    // A* and Dijkstra
    distance[source.i][source.j] = 0;
    source.distance = 0;
    pQueue.enqueue(source);

    for (let i = 0; i < graph.grid.length; i++) {
        for (let j = 0; j < graph.grid[i].length; j++) {
            console.log(graph.grid[i][j].x, graph.grid[i][j].y);
            graph.grid[i][j].h = Math.hypot((graph.grid[i][j].x - destination.x), (graph.grid[i][j].y - destination.y));
            graph.grid[i][j].f = graph.grid[i][j].h + graph.grid[i][j].distance;
        }
    }
}

let loop = true;

function draw() {

    if (algorithm === 'bfs') {
        bfs(20,10);
    }
    if (algorithm === 'dijkstra') {
        weightedSearch(20,10,true);
    }
    if (algorithm === 'A-star') {
        weightedSearch(20,10,false);
    }


    background(255);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            graph.grid[i][j].draw();
        }
    }
}
var sol;
var source;
var destination;
var queue = new Queue();
var parent;
var path= [];

function setup() {

  // setting up board
  var canvas = createCanvas(gridLength, gridLength);
  background(255);
  canvas.parent('board-holder');
  stroke('#981BA3');
  strokeWeight(2);

  // example problems
  graph.setStartNode(graph.grid[8][7]);
  graph.setEndNode(graph.grid[13][9]);
 graph.addObstacleNode(graph.grid[10][7])
//   graph.addObstacleNode(graph.grid[3][3])
//   graph.addObstacleNode(graph.grid[3][4])
//   graph.addObstacleNode(graph.grid[2][1])
//   bfs(graph.startNode, graph.endNode);
//   sol =  bfsPath(graph.endNode)

  
  source = graph.startNode;
  destination = graph.endNode;
  source.depth = 0;
  distance[source.i][source.j]= 0;

  algorithm = 'bfs';
  source.distance = 0;
  pQueue.enqueue(source);
}

let loop = true;
function draw() {
    
    if (algorithm === 'bfs') {
        queue.push(source);
        
        bfs();
    }
    if (algorithm === 'dijkstra') {

        
        dijkstra();
    }


    background(255);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            graph.grid[i][j].draw('yellow');
        }
    }
}



var rows;
var columns;
const gridLength = 320; //in pixels
var graph;
var pQueue;
var queue;

var sourceDragging = false;
var destDragging = false;
var algorithm;


function resetGraph(rows_=15, columns_=15, startNodeI=4, startNodeJ=4, endNodeI=5, endNodeJ=14) {
    rows = rows_;
    columns = columns_;
  
    graph = new Graph(rows,columns,gridLength);
    pQueue = new PriorityQueue();
    queue = new Queue();
    resizeCanvas(columns* graph.nodeWidth,rows*graph.nodeHeight);

    graph.setStartNode(graph.grid[startNodeI][startNodeJ]);
    graph.setEndNode(graph.grid[endNodeI][endNodeJ]);

    algorithm = 'None';
    graph.setNodesData(graph.endNode)

    // BFS
    graph.startNode.depth = 0;
    queue.push(graph.startNode);

    // A* and Dijkstra
    graph.distances[graph.startNode.i][graph.startNode.j] = 0;
    graph.startNode.distance = 0;
    pQueue.enqueue(graph.startNode);
}

function setup() {

    
    // setting up board
    var canvas = createCanvas(gridLength, gridLength);
    background(255);
    canvas.parent('board-holder');
    stroke('#6B10E5');
    strokeWeight(0.5);
    //=================================
    
    resetGraph();
    // graph.addObstacleNode(graph.grid[9][7])
    // graph.addObstacleNode(graph.grid[9][8])
    // graph.addObstacleNode(graph.grid[10][9])
    
    //=================================

    

}

let i;
let cont =true;
let running = true;
function draw() {
    //  scale((gridLength/(columns*graph.nodeLength)),gridLength/(rows*graph.nodeWidth));
    // scale(gridLength/(graph.rows*graph.nodeHeight))
    if (sourceDragging) {
        snapSource();
    } 
    
    if (destDragging) {
        snapDest();
    }
    if (running) {
        
        if (algorithm === 'bfs') {
            bfs(queue,graph, 40,20,cont);
        }
        if (algorithm === 'dijkstra') {
            
            weightedSearch(pQueue, graph, 20,10,true,cont);

        }
        if (algorithm === 'A-star') {
            weightedSearch(pQueue, graph,20,10,false,cont);
        }

        i=graph.path.length-1;
    } 
    else {
        if (i>=0){;
        graph.path[i].inPath = true;
        graph.path[i].isEmpty = false;
        i--;
        }
        else {running = true; algorithm= "none"}
    }
    background(255);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            graph.grid[i][j].draw();
        }
    }

}

function inBoard () {
    return (
    mouseX < graph.grid[rows-1][columns-1].x+graph.nodeWidth &&
        mouseX >= graph.grid[0][0].x &&
        mouseY < graph.grid[rows-1][columns-1].y+graph.nodeHeight && 
        mouseY >= graph.grid[0][0].y )
}

function mousePressed (e){
    
    //check if mouse is over the ellipse
    if(mouseX>graph.startNode.x && mouseX < graph.startNode.x + graph.nodeWidth &&
        mouseY>graph.startNode.y && mouseY < graph.startNode.y + graph.nodeHeight){
      sourceDragging = true;
    }
    if(mouseX>graph.endNode.x && mouseX < graph.endNode.x + graph.nodeWidth &&
        mouseY>graph.endNode.y && mouseY < graph.endNode.y + graph.nodeHeight){
        destDragging = true;
    }
    else if (inBoard()) 
    {
        obstacleToggle (e);
    }

}

function mouseReleased() {
    //check if mouse is over the ellipse
    if(sourceDragging){
      sourceDragging = false;
    }
    if(destDragging){
        destDragging = false;
    }
}


function snapSource () {
    if (!inBoard()) {
       return;
   }
    console.log(mouseX, "b");
    mouseX -= (mouseX % (graph.nodeWidth))
    mouseY -= (mouseY % (graph.nodeHeight))
    console.log(mouseX, "a");
    
    let i = mouseY/ (graph.nodeHeight);
    let j = mouseX/ (graph.nodeWidth);
    if(graph.grid[i][j] === undefined){
        debugger;
    }
    if(graph.grid[i][j].isDestination) {
        
            graph.setEndNode(graph.grid[(i+1)%(graph.rows)][(j+1)%(graph.columns)]);
    }
    graph.setStartNode(graph.grid[i][j]);
}

function snapDest () {
    if (!inBoard()) {
        return;
    }
    mouseX -= mouseX % (graph.nodeWidth)
    mouseY -= mouseY % (graph.nodeHeight)
    let i = (mouseY/ graph.nodeHeight)
    let j = (mouseX / graph.nodeWidth);
    if(graph.grid[i][j].isSource) {
        graph.setStartNode(graph.grid[(i+1)%(graph.rows)][(j+1)%(graph.columns)]);
    }
    graph.setEndNode(graph.grid[i][j]);
}

function obstacleToggle (e) {
    if (mouseX>= graph.grid[rows-1][columns-1].x+graph.nodeWidth||
        mouseX < graph.grid[0][0].x || 
        mouseY >=graph.grid[rows-1][columns-1].y+graph.nodeHeight|| 
        mouseY< graph.grid[0][0].y) {
       return;
   }
    let x = e.offsetX;
    let y = e.offsetY;
    if (x>= graph.grid[rows-1][columns-1].x+graph.nodeWidth||
        x < graph.grid[0][0].x || 
        y >=graph.grid[rows-1][columns-1].y+graph.nodeHeight|| 
        y< graph.grid[0][0].y) {
       return;
   }

   x -= x % (graph.nodeWidth)
   y -= y % (graph.nodeHeight)
   let i = (y/ graph.nodeHeight)
   let j = (x / graph.nodeWidth);
   if(graph.grid[i][j].isObstacle) {
        graph.grid[i][j].emptyNode();
    }else {
        graph.addObstacleNode(graph.grid[i][j]);
    }   
}

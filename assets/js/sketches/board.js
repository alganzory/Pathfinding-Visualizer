var source;
var destination;
var parent;
var path = [];
var sourceDragging = false;
var destDragging = false;
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
    algorithm = 'None';

    // BFS
    source.depth = 0;
    queue.push(source);

    // A* and Dijkstra
    distance[source.i][source.j] = 0;
    source.distance = 0;
    pQueue.enqueue(source);

    for (let i = 0; i < graph.grid.length; i++) {
        for (let j = 0; j < graph.grid[i].length; j++) {
            graph.grid[i][j].h = Math.hypot((graph.grid[i][j].x - destination.x), (graph.grid[i][j].y - destination.y));
            graph.grid[i][j].f = graph.grid[i][j].h + graph.grid[i][j].distance;
        }
    }

        
    // canvas.mouseOut(() => {
    //     sourceDragging = false;
    //     destDragging = false;
    // })

}

let loop = true;

function draw() {
    if (sourceDragging) {
        snapSource();
    } 
    
    if (destDragging) {
        snapDest();
    }

    
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


function mousePressed (e){
    
    //check if mouse is over the ellipse
    if(mouseX>graph.startNode.x && mouseX < graph.startNode.x + graph.nodeLength &&
        mouseY>graph.startNode.y && mouseY < graph.startNode.y + graph.nodeLength){
        console.log("Sourxe");
      sourceDragging = true;
    }
    if(mouseX>graph.endNode.x && mouseX < graph.endNode.x + graph.nodeLength &&
        mouseY>graph.endNode.y && mouseY < graph.endNode.y + graph.nodeLength){
        destDragging = true;
    }
    else {
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
    if (mouseX>= graph.grid[rows-1][columns-1].x+graph.nodeLength||
        mouseX < graph.grid[0][0].x || 
        mouseY >=graph.grid[rows-1][columns-1].y+graph.nodeLength|| 
        mouseY< graph.grid[0][0].y) {
       return;
   }
    mouseX -= mouseX % (graph.nodeLength)
    mouseY -= mouseY % (graph.nodeLength)
    let i = (mouseY/ graph.nodeLength);
    let j = (mouseX / graph.nodeLength);
    // console.log(i,j);
    if(graph.grid[i][j].isDestination) {
        graph.setEndNode(graph.grid[(i+1)%(graph.rows)][(j+1)%(graph.columns)]);
    }
    graph.setStartNode(graph.grid[i][j]);
}

function snapDest () {
    if (mouseX>= graph.grid[rows-1][columns-1].x+graph.nodeLength||
         mouseX < graph.grid[0][0].x || 
         mouseY >=graph.grid[rows-1][columns-1].y+graph.nodeLength|| 
         mouseY< graph.grid[0][0].y) {
        return;
    }
    mouseX -= mouseX % (graph.nodeLength)
    mouseY -= mouseY % (graph.nodeLength)
    let i = (mouseY/ graph.nodeLength)
    let j = (mouseX / graph.nodeLength);
    // console.log(i,j);
    if(graph.grid[i][j].isSource) {
        graph.setStartNode(graph.grid[(i+1)%(graph.rows)][(j+1)%(graph.columns)]);
    }
    graph.setEndNode(graph.grid[i][j]);
}

function obstacleToggle (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (x>= graph.grid[rows-1][columns-1].x+graph.nodeLength||
        x < graph.grid[0][0].x || 
        y >=graph.grid[rows-1][columns-1].y+graph.nodeLength|| 
        y< graph.grid[0][0].y) {
       return;
   }

   x -= x % (graph.nodeLength)
   y -= y % (graph.nodeLength)
   let i = (y/ graph.nodeLength)
   let j = (x / graph.nodeLength);
   if(graph.grid[i][j].isObstacle) {
        graph.grid[i][j].clearNode();
    }else {
        graph.addObstacleNode(graph.grid[i][j]);
    }   
}

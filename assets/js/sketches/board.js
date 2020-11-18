
function setup() {
  var canvas = createCanvas(gridLength, gridLength);
  background(255);
  canvas.parent('board-holder');
  stroke('#981BA3');
  strokeWeight(2);
  graph.setStartNode(graph.startNode.i,graph.startNode.j);
  graph.setEndNode(graph.endNode.i,graph.endNode.j);
}

function draw() {

    
    background(255);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            graph.grid[i][j].draw(0);
        }
    }

}


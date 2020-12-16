document.querySelector('#generate-form')
    .addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData (e.target);
        let rows_ = +formData.get('rows')
        let columns_ = +formData.get('columns')
        let sourceX_= +formData.get('sourceX')
        let sourceY_ = +formData.get('sourceY')
        let destX_ = +formData.get('destX')
        let destY_ = +formData.get('destY')
        
        if (sourceX_===destX_ & sourceY_===destY_){
            sourceX_=0;
            sourceY_=0;
            destX_=rows_-1;
            destY_=columns_-1;

            sourceX.value = sourceX_;
            sourceY.value = sourceY_;
            destX.value= destX_
            destY.value = destY_
        }

        if (sourceX_ >= rows_  || destX >= rows_ || sourceY_ >= columns_ || destY_ >= columns_) {
            sourceX_=0;
            sourceY_=0;
            destX_=rows_-1;
            destY_=columns_-1;

            sourceX.value = sourceX_;
            sourceY.value = sourceY_;
            destX.value= destX_
            destY.value = destY_
        }
        resetGraph(rows_,columns_,sourceX_,sourceY_,destX_,destY_);
        defaultButtonStates();
    }
)

const sourceX= document.querySelector('#sourceX')
sourceX.addEventListener('change', function(e) {
        const rowsCount = +document.querySelector('#rows').value;
        if (+this.value >= rowsCount){
            this.value=rowsCount-1;
        }
    })


const sourceY= document.querySelector('#sourceY')
sourceY.addEventListener('change', function(e) {
    const colsCount = +document.querySelector('#cols').value;
    if (+this.value >= colsCount){
        this.value=colsCount-1;
    }
})


const destX=document.querySelector('#destX')
destX.addEventListener('change', function(e) {
    const rowsCount = +document.querySelector('#rows').value;

    if (+this.value >= rowsCount){
        this.value=rowsCount-1;
    }
})


const destY=document.querySelector('#destY')
destY.addEventListener('change', function(e) {
    const colsCount = +document.querySelector('#cols').value;
    console.log(running);
    if (+this.value >= colsCount){
        this.value=colsCount-1;
    }
})

const algChoice = document.querySelector('#algorithm');

const solveButton = document.querySelector('#solve');
solveButton.addEventListener('click', function(e){
    let choice = algChoice.options[algChoice.selectedIndex].value;
    solveGraph(choice);
    stopButton.disabled=false;
    this.disabled= true;
})

const stopButton= document.querySelector('#stop');
stopButton.addEventListener('click', function(e){
    noLoop();
    stopOrEnd();
    
})

const clearGraphButton = document.querySelector('#clear-graph');
clearGraphButton.addEventListener('click', function(e){
    resetGraph(graph.rows,graph.columns,
        graph.startNode.i, graph.startNode.j,
        graph.endNode.i, graph.endNode.j);
        defaultButtonStates();
})
// clearGraphButton.addEventListener()

function defaultButtonStates () {
    clearGraphButton.style.visibility = "hidden"
    clearGraphButton.style.display="none";
    stopButton.style.display="block";
    stopButton.style.visibility = "visible"
    stopButton.disabled=true;
    solveButton.disabled=false;
    loop();
}

function stopOrEnd() {
    stopButton.style.visibility = "hidden"
    stopButton.style.display="none";
    clearGraphButton.style.display="block";
    clearGraphButton.style.visibility = "visible"
}

const connectButton = document.querySelector("#connect");
connectButton.addEventListener('click', function (e) {
    let directions = getDirectionsFromPath();
    console.log(directions);
    var xhr = new XMLHttpRequest();
    var url = "http://192.168.8.100/path";
    xhr.open("POST", url);
    var data = {path:"wxdaswxdaS"};
    xhr.send(JSON.stringify(data));
    console.log("DONE");

})


function getDirectionsFromPath() {
    let directions = [];
    for (let i= graph.path.length-1; i>= 0 ; i--) {
        let thisNode = graph.path[i];
        let parent = graph.path[i].parent;
        
        // the letters corresponding to the directions are following keyborad layout

        //  q  w  e
        //  a  s  d
        //  z  x  c
        
        if (parent.i==thisNode.i && parent.j == thisNode.j )
            continue;
        if (parent.i==thisNode.i && parent.j == thisNode.j-1) // right
            directions.push("d");
        else if (parent.i==thisNode.i && parent.j == thisNode.j+1) //left
            directions.push("a");
        else if (parent.i==thisNode.i-1 && parent.j == thisNode.j) //down
            directions.push("x");
        else if (parent.i==thisNode.i+1 && parent.j == thisNode.j) //up
            directions.push("w");
        else if (parent.i==thisNode.i-1 && parent.j == thisNode.j-1) //down right
            directions.push("c");
        else if (parent.i==thisNode.i-1 && parent.j == thisNode.j+1) //down left
            directions.push("z");
        else if (parent.i==thisNode.i+1 && parent.j == thisNode.j-1) // up right
            directions.push("e");
        else if (parent.i==thisNode.i+1 && parent.j == thisNode.j+1) // up left
            directions.push("q");
    }
    directions.push("S"); // Stop
    directions = directions.join ("");
    return directions;
}
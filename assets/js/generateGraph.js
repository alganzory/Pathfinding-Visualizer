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
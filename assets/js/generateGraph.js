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
    
    if (+this.value >= colsCount){
        this.value=colsCount-1;
    }
})


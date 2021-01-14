exports.getPage= ( req,res,next ) => {
    res.render ('capture', {
        pageTitle: "Capture"
    })
}
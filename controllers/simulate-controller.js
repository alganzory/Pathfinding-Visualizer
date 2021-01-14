exports.getPage= (req, res, next) => {
    res.render ('simulate', {
        pageTitle: 'Simulate'
  })
}
// packages
const express = require("express");
const path = require("path");


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use( express.static(path.join(__dirname, "algorithms")));


app.get ('/simulate', (req,res,next) => {
    res.render ('simulate', {
      pageTitle: 'Simulate'
    })
})

app.use ('/', (req,res,next) => {
    res.render('home', {
        pageTitle: 'Home'
    })
})
app.listen(3000, (err) => console.log("Listening on port 3000"));
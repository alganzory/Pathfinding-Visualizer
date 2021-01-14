// packages
const express = require("express");
const path = require("path");
const simulateRouter = require ("./routers/simulate-route")
const captureRouter = require ("./routers/capture-route")

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use( express.static(path.join(__dirname, "algorithms")));

app.get ('/', (req,res,next) => {
    res.render('home', {
        pageTitle: 'Home'
    })
})
app.use('/simulate', simulateRouter);
app.use('/capture', captureRouter);



app.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
      pageTitle: "404 | Page not found"
    });
});

app.listen(3000, (err) => console.log("Listening on port 3000"));
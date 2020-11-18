// packages
const express = require("express");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const STORE = new SessionStore({
  uri: "mongodb://localhost:27017/pathfinder-visualiser",
  collection: "sessions",
});

const app = express();

app.use(
  session({
    secret: "Secret encryption message for sessions",
    saveUninitialized: false,
    resave: true,
    store: STORE,
  })
);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.use(flash());

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
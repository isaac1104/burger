const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const port = 3000;
const app = express();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: 8889,
  database: "burgers_db"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req,res) => {
  connection.query("SELECT * FROM burgers", (err,data) => {
    if (err) throw err;
    res.render("index", {burger: data});
  });
});

app.post("/", (req,res) => {
  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burgers], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log("server listening on " + port);
});

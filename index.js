var express  = require("express");
var bodyParser = require("body-parser");
var app = express();
var cookieParser = require("cookie-parser");
var session  = require("express-session");

var urlApi = "http://localhost:8888";

module.exports = app;

app.use(
    session({
        secret: "vidyapathaisalwaysrunning",
        resave: true,
        saveUninitialized: true
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/ressources"));
app.set("view engine", "ejs"); // set up ejs for templating

require("./routes")(app, urlApi);

var port=process.env.PORT || 8082;

var server = app.listen(port, function() {
    console.log("Server started port "+port+"...");
});
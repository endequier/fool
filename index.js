var express = require('express'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs'),
    fs = require('fs'),
    io = require('socket.io'),
    mysql = require('mysql'),
    cookie = require("cookie"),
    connect = require("connect");

var app = express(),
    viewEngine = 'ejs';

app.set('port',9091);
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', viewEngine);

    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'helloworld',
        cookie: { path: '/', httpOnly: true, maxAge: 1000*60*60*24 }
    }));

    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});



app.get('/', function(req, res) {
    res.render('index',{title: 'Home'});
});

app.get("*.css", function(req, res) {
    var path = __dirname + req.url;
    fs.readFile(path, "utf8", function(err, css) {
        res.header("Content-type", "text/css");
        res.send(css);
    });
});

app.get("*.js", function(req, res) {
    var path = __dirname + req.url;
    fs.readFile(path, "utf8", function(err, js) {
        res.header("Content-type", "text/javascript");
        res.send(js);
    });
});



var server = http.createServer(app);
var io_server = io.listen(server);






server.listen(app.get('port'));




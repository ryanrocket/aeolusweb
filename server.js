var express = require('express');
var app = express();
var bp = require('body-parser');
var fs = require('fs');

app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    next();
})

app.get('/packaged/*', (req, res) => {
    var modifier = req.path.split("/");
        modifier = modifier[modifier.length-1];
    var type     = modifier.split(".")[1];
    if("css" == type) {res.sendFile('./cdn/Theme-Aeolus.css', {root: __dirname})}
    else if("etl" == type) {res.sendFile('./cdn/main.html', {root: __dirname})}
    else if("js" == type){res.sendFile("./cdn/AeolusFinished.js", {root: __dirname})}
    else{res.send("unknown file");}
});

app.get('/assets/*', (req, res) => {
    var modifier = req.path.split("/");
        modifier = modifier[modifier.length-1];
    res.sendFile('/assets/'+modifier, {root: __dirname});
})

app.get("*", (req, res) => {
    res.sendFile("./global.html", {root: __dirname});
})

app.listen(8080, () => {
    console.log("App Running on port 8080");
})
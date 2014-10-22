var neutronjs = require("neutronjs");
var express = require("express");
var compression = require("compression");
var path = require("path");
var mongo = require("mongodb");

console.log("connecting...");
mongo.connect("mongodb://cloudstudios.ch:27017/websitify",function(err,db){
    if(err) throw err;
    
    var app = express();
    app.use(compression());
    app.use("/public/",express.static(path.resolve(__dirname,"./public")));

    var website = new neutronjs.Website("/neutron/");
    website.registerPages(
        require("./pages/start.js")
    );

    website.set("/","Start",{title:"Start"});

    app.use(website);


    app.listen(8080);
    console.log("listening on port 8080...")

});

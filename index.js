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

    var website = new neutronjs.Website({path:"/neutron/"});
    
    website.registerViews(
        require.resolve("./views/start.jade"),
        require.resolve("./views/dienstleistungen.jade")
    );
    
    website.addRoute("/","Start",{});
    website.addRoute("/dienstleistungen","Dienstleistungen",{});
    
    app.use(website);


    app.listen(8080);
    console.log("listening on port 8080...")

});

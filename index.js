var neutronjs = require("neutronjs");
var express = require("express");
var compression = require("compression");
var path = require("path");
var mongo = require("mongodb");
var config = require("./config.js");

console.log("connecting...");
mongo.connect(config.db,function(err,db){
    if(err) throw err;

    var app = express();
    app.use(compression());
    app.use("/public/",express.static(path.resolve(__dirname,"./public")));

    var website = new neutronjs.Website({path:"/neutron/"});

    website.registerViewsInDirectory(path.resolve(__dirname,"./views"));

    website.addRoute("/","start");
    website.addRoute("/dienstleistungen","dienstleistungen");
    website.addRoute("/equipment","equipment");
    website.addRoute("/referenzen","referenzen");
    website.addRoute("/crew","crew");
    website.addRoute("/kontakt","contact");

    app.use(website);


    app.listen(config.port);
    console.log("listening on port "+config.port+"...")

});

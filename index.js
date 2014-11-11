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

    website.registerViews({
        Start: require.resolve("./views/start.jade"),
        Dienstleistungen: require.resolve("./views/dienstleistungen.jade"),
        Equipment: require.resolve("./views/equipment.jade"),
        Referenzen: require.resolve("./views/referenzen.jade"),
        Crew: require.resolve("./views/crew.jade"),
        Contact: require.resolve("./views/contact.jade")
    });

    website.addRoute("/","Start",{});
    website.addRoute("/dienstleistungen","Dienstleistungen",{});
    website.addRoute("/equipment","Equipment",{});
    website.addRoute("/referenzen","Referenzen",{});
    website.addRoute("/crew","Crew",{});
    website.addRoute("/kontakt","Contact",{});

    app.use(website);


    app.listen(config.port);
    console.log("listening on port "+config.port+"...")

});

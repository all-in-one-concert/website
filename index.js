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

    var website = new neutronjs.Website({path:"/neutron/",db:db});

    website.addRoute("/",require("./pages/start"));
    website.addRoute("/dienstleistungen",require("./pages/services"));
    website.addRoute("/equipment",require("./pages/equipment"));
    website.addRoute("/blog",require("./pages/blog"));
    website.addRoute("/blog/:id",require("./pages/blogpost"));
    website.addRoute("/referenzen",require("./pages/references"));
    website.addRoute("/crew",require("./pages/crew"));
    website.addRoute("/kontakt",require("./pages/contact"));

    website.registerAdminModule(require("./modules/blog"));
    website.registerAdminModule(require("neutronjs/lib/filemanager"));

    app.use(website);


    app.listen(config.port);
    console.log("listening on port "+config.port+"...")

});

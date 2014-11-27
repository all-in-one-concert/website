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

    website.registerViewsInDirectory(path.resolve(__dirname,"./views"));
    
    

    website.addRoute("/","start", {handler:require("./pages/default.js"),data:{base:"base",start:"start"}});
    website.addRoute("/dienstleistungen","services",{handler:require("./pages/default.js"),data:{base:"base",services:"services"}});
    website.addRoute("/equipment","equipment",{handler:require("./pages/default.js"),data:{base:"base",equipment:"equipment"}});
    website.addRoute("/referenzen","referenzen",{handler:require("./pages/default.js"),data:{base:"base",references:"references"}});
    website.addRoute("/crew","crew",{handler:require("./pages/default.js"),data:{base:"base",crew:"crew"}});
    website.addRoute("/kontakt","contact",{handler:require("./pages/default.js"),data:{base:"base",contact:"contact"}});
    
    website.registerAdminModule(require("./modules/blog"));

    app.use(website);


    app.listen(config.port);
    console.log("listening on port "+config.port+"...")

});

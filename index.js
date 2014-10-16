var neutronjs = require("neutronjs");
var express = require("express");
var compression = require("compression");
var path = require("path");
var mongo = require("mongodb");

console.log("connecting...");
mongo.connect("mongodb://cloudstudios.ch:27017/websitify",function(err,db){
    if(err) throw err;

    var website = new neutronjs.Website("/neutron/");
    console.log("building...");
    website.build(__dirname,,{
        "Home":"./pages/home.jade"
    },function(err,build){
        var app = express();
        app.use(compression());
        app.use(website.router);
        app.use("/public/",express.static(path.resolve(__dirname,"./public")));
        app.use("/",function(req,res){
            website.render(res,"Home",{
                page:{
                    canEdit:true
                }
            });
        });
        app.listen(8080);
        console.log("listening on port 8080...")
    });
});

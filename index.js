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

    var structure = [
        {
            url:"/",
            name:"Start",
            template:"./views/home.jade"
        },{
            url:"/dienstleistungen",
            name:"Dienstleistungen",
            template:"./views/dienstleistungen.jade"
        },{
            url:"/equipment",
            name:"Equipment",
            template:"./views/equipment.jade"
        },{
            url:"/blog",
            name:"Blog",
            template:"./views/blog.jade"
        },{
            url:"/referenzen",
            name:"Referenzen",
            template:"./views/referenzen.jade"
        },{
            url:"/crew",
            name:"Crew",
            template:"./views/crew.jade"
        },{
            url:"/kontakt",
            name:"Kontakt",
            template:"./views/kontakt.jade"
        }
    ];


    website.build(__dirname,{
        "Home":"./views/home.jade",
        "Dienstleistungen":"./views/dienstleistungen.jade"
    },function(err,build){
        var app = express();
        app.use(compression());
        app.use(website.router);
        app.use("/public/",express.static(path.resolve(__dirname,"./public")));
        app.get("/",function(req,res){
            website.render(res,"Home",{});
        });
        app.get("/dienstleistungen",function(req,res){
            website.render(res,"Dienstleistungen",{});
        });

        app.listen(8080);
        console.log("listening on port 8080...")
    });
});

var Widget = require("./widget.js");
var async = require("async");

function BasicPage(extend,id,fields,path){
    function Page(){
        Widget.call(this,"pages",id,fields);
    }
    Page.prototype.componentPath = path;
    Page.prototype.load = function(website,data,cb){
        var self = this;
        async.parallel([
            function(cb){
                Widget.prototype.load.call(self,website,data,cb);
            },
            function(cb){
                async.each(extend,function(widget,cb){
                    widget.load(website,data,cb);
                },cb)
            }
        ],cb);
    }
    Page.prototype.save = function(website,data,cb){
        var self = this;
        async.parallel([
            function(cb){
                Widget.prototype.save.call(self,website,data,cb);
            },
            function(cb){
                async.each(extend,function(widget,cb){
                    widget.save(website,data,cb);
                },cb)
            }
        ],cb);
    }
    return new Page();    
}

module.exports = BasicPage;
var async = require("async");
var Base = require("../base");
var Widget = require("../widget.js");

function Start(){
    Widget.call(this,{
        jumbo:"area",
        services:"area",
        equipment:"area"
    });
    this.base = new Base();
}
Start.prototype = Object.create(Widget.prototype);
Start.prototype.componentPath = require.resolve("./component.jade");
Start.prototype.load = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){
            self.__proto__.load.call(self,website,data,cb)
        },
        function(cb){
            self.base.load(website,data,cb);
        }
    ],cb);
}
Start.prototype.save = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){
            self.__proto__.save.call(self,website,data,cb)
        },
        function(cb){
            self.base.save(website,data,cb);
        }
    ],cb);
}

module.exports = Start;

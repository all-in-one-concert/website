var async = require("async");

function Widget(){
}
Widget.prototype.load = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){
            var query = {};
            for(var key in self.fields) query["data."+key] = true;
            website.db.collection("pages").findOne({id:"start"},query,function(err,start){
                if(err) return cb(err);
                var widgets = [];
                if(!start) start = {};
                for(var key in self.fields){
                    if(!data[key]) data[key] = {type:self.fields[key]};
                    widgets.push(data[key]);
                }
                website.loadWidgets(widgets,cb);
            });
        },
        function(cb){
            self.base.load(data,cb);
        }
    ],cb);
}
Widget.prototype.save = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){
            var widgets = [];
            for(var key in self.fields) widgets.push(data[key]);
            website.saveWidgets(widgets,function(err){
                if(err) return cb(err);
                var update = {};
                for(var key in self.fields) update["data."+key] = data[key];
                website.db.collection("pages").update({id:"start"},{$set:update},{upsert:true},cb);
            });
        },
        function(cb){
            self.base.save(website,data,cb)
        }
    ],cb);
}

module.exports = Widget;

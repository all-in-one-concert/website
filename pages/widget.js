var async = require("async");

function Widget(collection,id,fields){
    this.collection = collection;
    this.id = id;
    this.fields = fields;
}
Widget.prototype.load = function(website,data,cb){
    var self = this;
    var query = {};
    for(var key in self.fields) query[key] = true;    
    website.db.collection(this.collection).findOne({_id:this.id},query,function(err,doc){
        if(err) return cb(err);
        var widgets = [];
        if(!doc) doc = {};
        for(var key in self.fields){
            data[key] = doc[key]||{type:self.fields[key]};
            widgets.push(data[key]);
        }
        website.loadWidgets(widgets,cb);
    });
}
Widget.prototype.save = function(website,data,cb){
    var self = this;
    var widgets = [];
    for(var key in self.fields) widgets.push(data[key]);
    website.saveWidgets(widgets,function(err){
        if(err) return cb(err);
        var update = {};
        for(var key in self.fields) update[key] = data[key];
        website.db.collection(self.collection).update({_id:self.id},{$set:update},{upsert:true},cb);
    });
}

module.exports = Widget;

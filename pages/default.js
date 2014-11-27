var async = require("async");

exports.getData = function(req,cb){
    var data = {};
    var self = this;
    async.each(Object.keys(this.data),function(key,cb){
        self.website.opts.db.collection("pages").findOne({_id:self.data[key]},{data:true},function(err,page){
            if(err) return cb(err);
            data[key] = page?page.data:{};
            cb();
        });
    },function(err){
        if(err) return cb(err);
        cb(null,data);
    });
}
exports.setData = function(req,cb){
    var self = this;
    async.each(Object.keys(this.data),function(key,cb){
        self.website.opts.db.collection("pages").update({_id:self.data[key]},{$set:{data:req.body[key]}},{upsert:true},cb);
    },cb);
}
exports.getData = function(req,cb){
    this.website.opts.db.collection("pages").findOne({id:this.id},{data:true},function(err,page){
        if(err) return cb(err);
        cb(null,page.data||{});
    });
}
exports.setData = function(req,data,cb){
    this.website.opts.db.collection("pages").update({id:this.id},{$set:{data:data}},cb);
}
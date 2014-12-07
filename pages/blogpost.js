var BasicPage = require("./basic.js");
var async = require("async");
var mongo = require("mongodb");
var base = require("./base.js");

module.exports = Object.create(base);
module.exports.componentPath = require.resolve("../views/blogpost.jade");

module.exports._load = module.exports.load;
module.exports.load = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){self._load(website,data,cb)},
        function(cb){
            website.db.collection("blogposts").findOne({_id:mongo.ObjectID(data.params.id)},{title:true,date:true,preview:true,body:true},function(err,post){
                data.post = post;
                website.loadWidgets([post.preview,post.body],cb);
            });
        }
    ],cb)
}
module.exports._save = module.exports.save;
module.exports.save = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){self._save(website,data,cb)},
        function(cb){
            website.saveWidgets([data.post.preview,data.post.body],function(){
                website.db.collection("blogposts").update({_id:mongo.ObjectID(data.post._id)},{$set:{preview:data.post.preview,body:data.post.body}},cb);
            });
        }
    ],cb);
}

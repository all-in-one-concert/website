var BasicPage = require("./basic.js");
var async = require("async");
var mongo = require("mongodb");
var base = require("./base.js");

module.exports = Object.create(base);
module.exports.componentPath = require.resolve("../views/blog.jade");

module.exports._load = module.exports.load;
module.exports.load = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){self._load(website,data,cb)},
        function(cb){
            website.db.collection("blogposts").find({},{title:true,date:true,preview:true}).sort({date:-1}).limit(10).toArray(function(err,posts){
                data.posts = posts;
                website.loadWidgets(posts.map(function(post){return post.preview}),cb);
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
            website.saveWidgets(data.posts.map(function(post){return post.preview}),function(){
                async.each(data.posts,function(post,cb){
                    website.db.collection("blogposts").update({_id:mongo.ObjectID(post._id)},{$set:{preview:post.preview}},cb);
                },cb);
            });
        }
    ],cb);
}

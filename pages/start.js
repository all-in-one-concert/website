var BasicPage = require("./basic.js");
var async = require("async");
var mongo = require("mongodb");

module.exports = BasicPage(
    [require("./base.js")],
    "start",
    {
        jumbo:"area",
        services:"area",
        equipment:"area"
    },
    require.resolve("../views/start.jade")
);
module.exports._load = module.exports.load;
module.exports.load = function(website,data,cb){
    var self = this;
    async.parallel([
        function(cb){self._load(website,data,cb)},
        function(cb){
            website.db.collection("blogposts").find({},{title:true,date:true,preview:true}).sort({date:-1}).limit(3).toArray(function(err,posts){
                console.log(posts);
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

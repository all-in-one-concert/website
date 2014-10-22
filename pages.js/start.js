var Page = require("neutronjs").Page;

module.exports = new Page({
    name:"Start",
    componentPath:require.resolve("../views/home.jade"),
    init:function(){
    },
    getData:function(cb){
        cb();
    },
    setData:function(cb){
        cb();
    }
});

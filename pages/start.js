var Page = require("neutronjs").Page;

module.exports = new Page({
    id:"Start",
    componentPath:require.resolve("../views/home.jade")
});;

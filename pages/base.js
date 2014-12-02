var BasicPage = require("./basic.js")

module.exports = BasicPage([],"base",{
    footerleft:"area",
    footermiddle:"area",
    footerright:"area"
},require.resolve("../views/base.jade"));

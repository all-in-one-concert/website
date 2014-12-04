var List = require("neutronjs/lib/adminpanel/list.js");

var test = new List("test",{});
test.add({
    title:{
        type:String,
        default:true,
        search:true
    },
    date:{
        type:Date,
        default:true
    }
});

module.exports = test;
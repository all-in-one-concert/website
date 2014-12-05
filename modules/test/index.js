var List = require("neutronjs/lib/adminpanel/list.js");
var WidgetType = require("neutronjs/lib/types/widget");

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
    },
    body:{
        type:WidgetType,
        widgetType:"area"
    }
});

module.exports = test;
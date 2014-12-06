var List = require("neutronjs/lib/adminpanel/list.js");
var WidgetType = require("neutronjs/lib/types/widget");

var test = new List("blogposts",{
    label:"Blog"
});
test.add({
    title:{
        type:String,
        label:"Titel",
        default:true,
        search:true
    },
    date:{
        type:Date,
        label:"Datum",
        default:true
    },
    preview:{
        type:WidgetType,
        label:"Vorschau",
        widgetType:"text"
    },
    body:{
        type:WidgetType,
        label:"Inhalt",
        widgetType:"area"
    }
});
test.defaultSort = {date:-1}

module.exports = test;

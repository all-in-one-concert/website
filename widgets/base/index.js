var Widget = require("../widget.js");

function Base(){
    Widget.call(this,{
        footerleft:"area",
        footermiddle:"area",
        footerright:"area"
    });
}
Base.prototype = Object.create(Widget.prototype);
Base.prototype.componentPath = require.resolve("./component.jade");


module.exports = Base;

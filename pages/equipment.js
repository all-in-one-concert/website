var BasicPage = require("./basic.js");

module.exports = BasicPage(
    [require("./base.js")],
    "equipment",
    {
        title:"area",
        equipment:"area"
    },
    require.resolve("../views/equipment.jade")
);

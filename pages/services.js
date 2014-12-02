var BasicPage = require("./basic.js");

module.exports = BasicPage(
    [require("./base.js")],
    "services",
    {
        title:"area",
        services:"area",
        rental:"area"
    },
    require.resolve("../views/services.jade")
);

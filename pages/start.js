var BasicPage = require("./basic.js");

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
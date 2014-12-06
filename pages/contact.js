var BasicPage = require("./basic.js");

module.exports = BasicPage(
    [require("./base.js")],
    "contact",
    {
        contact:"area"
    },
    require.resolve("../views/contact.jade")
);

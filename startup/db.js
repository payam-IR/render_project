const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:main");
module.exports = function () {
  mongoose
    .connect(config.get("db.address"))
    .then(() => debug("connection succssed"))
    .catch(() => debug("connection failed"));
};

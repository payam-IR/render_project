const winston = require("winston");
module.exports = (err, req, res, next) => {
  winston.error(err.messege, "|||||||||||", err);
  res.render("wrong", { err });
};

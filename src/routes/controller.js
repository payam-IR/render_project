const { validationResult } = require("express-validator");
const User = require("./../models/users");
module.exports = class {
  constructor() {
    this.User = User;
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const message = [];
      errors.forEach((e) => {
        message.push(e.msg);
      });
      req.flash("err", message);
      if (message.length) {
        return res.redirect("back");
      }
    }
    return true;
  }
  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
  Response({ code = 200, data = {}, res, messege }) {
    res.status(code).json({
      messege,
      data,
    });
  }
  Error(message, status) {
    let err = new Error(message);
    err.status = status;
    throw err;
  }
};

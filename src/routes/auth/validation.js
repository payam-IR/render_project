const val = require("express-validator");
const check = val.check;
const path = require("path");
module.exports = new (class {
  registerValidator() {
    return [
      check("username").notEmpty().withMessage("username cannot be empty!"),
      check("username").isLength({ max: 15 }).withMessage("limited size : 15 "),
      check("email").isEmail().withMessage("wrong email has been entered"),
      check("password")
        .notEmpty()
        .withMessage("wrong password has been entered"),
    ];
  }
  loginValidator() {
    return [
      check("email").isEmail().withMessage("invalid email!"),
      check("password").notEmpty().withMessage("password cannot be empty!"),
    ];
  }
  upadateValidation() {
    return [
      check("email").isEmail().withMessage("invalid email has entered!"),
      check("username").notEmpty().withMessage("username cannot be empty!"),
    ];
  }
  uploadValidation() {
    return [
      check("img").notEmpty().withMessage("هیچ فایلی انتخاب نشده است!"),

      check("img").custom(async (value) => {
        if (!value) {
          return;
        }
        if (![".jpg", ".png"].includes(path.extname(value))) {
          throw new Error("پسوند فایل ارسالی صحیح نمیباشد!");
        }
      }),
    ];
  }
})();

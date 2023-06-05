const express = require("express");
const controller = require("./controller");
const validator = require("./validation");
const { de_logged } = require("./../../middleware/mid");
const router = express.Router();
router.get("/register", de_logged, controller.form.bind(controller));
router.get("/login", de_logged, controller.login_form.bind(controller));
router.post(
  "/register",
  validator.registerValidator(),
  controller.validate.bind(controller),
  controller.register.bind(controller)
);
router.post(
  "/login",
  validator.loginValidator(),
  controller.validate.bind(controller),
  controller.login.bind(controller)
);
module.exports = router;

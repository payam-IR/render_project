const express = require("express");
const controller = require("./controller");
const { logged, isNotUser } = require("./../../middleware/mid");
const router = express.Router();
const validation = require("./../auth/validation").upadateValidation;
const uploadValidation = require("./../auth/validation").uploadValidation;
const upload = require("../../upload/upload");
router.get("/", logged, isNotUser, controller.user.bind(controller));
router.get("/me", logged,isNotUser,controller.me.bind(controller));
router.get("/me/:username",logged, controller.edit.bind(controller));
router.delete("/me/:username", controller.remove.bind(controller));
router.put(
  "/me/:username",
  validation(),
  controller.validate.bind(controller),
  controller.update.bind(controller)
);
router.post("/me/pay", controller.pay.bind(controller));
router.post(
  "/me/upload",
  logged,
  upload.single("img"),
  async function (req, res, next) {
    if (!req.file) {
      req.body.img = null;
    } else {
      req.body.img = req.file.filename;
    }
    next();
  },
  uploadValidation(),
  controller.validate.bind(controller),
  controller.upload.bind(controller)
);
router.post("/logout", logged, controller.logout.bind(controller));
module.exports = router;

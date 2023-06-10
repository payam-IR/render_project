const express = require("express");
const controller = require("./controller");
const validation = require("./../auth/validation").registerValidator;
const updateValidation = require("./../auth/validation").upadateValidation;
const { logged, isAdmin } = require("./../../middleware/mid");
const rout = express.Router();
const uploadValidation = require("./../auth/validation").uploadValidation;
const upload = require("../../upload/upload");
rout.get("/", logged, isAdmin, controller.Admin.bind(controller));
rout.put(
  "/profile/:id",
  updateValidation(),
  controller.validate.bind(controller),
  controller.edit_admin.bind(controller)
);
rout.get("/profile/:id", logged, isAdmin, controller.profile.bind(controller));
rout.delete("/:id", controller.die.bind(controller));
rout.post("/logout", controller.logout.bind(controller));
rout.post(
  "/upload",
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
rout.get("/users", logged, isAdmin, controller.Manage.bind(controller));
rout.get("/users/:id", logged, isAdmin, controller.edit.bind(controller));
rout.post(
  "/users/register",
  validation(),
  controller.validate.bind(controller),
  controller.register.bind(controller)
);
rout.delete("/users/:id", controller.remove.bind(controller));
rout.put(
  "/users/:id",
  updateValidation(),
  controller.validate.bind(controller),
  controller.update.bind(controller)
);
module.exports = rout;

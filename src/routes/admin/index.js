const express = require("express");
const controller = require("./controller");
const validation = require("./../auth/validation").registerValidator;
const updateValidation = require("./../auth/validation").upadateValidation;
const { logged, isAdmin } = require("./../../middleware/mid");
const rout = express.Router();
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

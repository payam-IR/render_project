const express = require("express");
const router = express.Router();
const controller = require("./controller");
router.get("/", controller.render.bind(controller));
module.exports = router;

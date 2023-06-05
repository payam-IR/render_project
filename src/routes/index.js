const express = require("express");
require("express-async-errors");
const err = require("./../middleware/err");
const router = express.Router();
const authHandler = require("./auth");
const userHandler = require("./user");
const adminHandler = require("./admin");
const home = require("./root");
router.use("/", home);
router.use("/api/auth", authHandler);
router.use("/api/user", userHandler);
router.use("/api/admin", adminHandler);
router.all("*", async (req, res, next) => {
  try {
    let err = new Error("page not found");
    res.status(404);
    err.status = 404 || 500;
    throw err;
  } catch (err) {
    next(err);
  }
});
router.use(err);
module.exports = router;

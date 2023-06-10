const express = require("express");
const debug = require("debug")("app:main");
const mongoose = require("mongoose");
const config = require("config");
const rout = require("./src/routes/index");
const winston = require("winston");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const app = express();
require("./startup/db")();
app.set("views", "./src/views");
app.set("view engine", "ejs");
const methodoverride = require("method-override");
app.use(cookieParser("payam-projection"));
let store = new MongoStore({
  collectionName: "sessions",
  mongoUrl: config.get("db.address"),
});
app.use(
  session({
    secret: "fuck you",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 604800000 },
    store: store,
  })
);
app.use(flash());
require("./passport/local_passport");
app.use(passport.initialize());
app.use(passport.session());
const router = require("./src/routes");
winston.add(new winston.transports.File({ filename: "errors.log" }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("method"));
app.use((req, res, next) => {
  const err = req.flash("err");
  const msg = req.flash("msg");
  res.locals = { err, msg, req };
  next();
});
app.use("/", router);
process.on("uncaughtException", (err) => {
  winston.error(err.message, err);
  console.log("error happend");
  process.exit();
});
process.on("unhandledRejection", (err) => {
  winston.error(err.message, err);
  console.log("rejection happend");
  process.exit(1);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is online in port: ${port}`);
});

const cont = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const passport = require("passport");
const config = require("config");
const jwt = require("jsonwebtoken");
const controller = require("../user/controller");

module.exports = new (class extends cont {
  async form(req, res) {
    res.status(200).render("register");
  }
  async login_form(req, res) {
    res.status(200).render("login");
  }
  async register(req, res, next) {
    passport.authenticate("register-str", (err, user) => {
      if (err) return next(err);
      if (!user) {
        req.flash("err", "مشکلی در ساخت اکانت پیش آمد");
        return res.redirect("/api/auth/register");
      }
      req.logIn(user, (err) => {
        if (err) throw err;
        return res.redirect("/api/user");
      });
    })(req, res, next);
  }

  async login(req, res, next) {
    passport.authenticate("log-str", (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.redirect("/api/auth/login")
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        if (req.user.admin) return res.redirect("/api/admin");
        return res.redirect("/api/user");
      });
    })(req, res, next);
  }
})();
// {
//   failureFlash: true,
//   failureRedirect: "/api/auth/register",
//   successRedirect: "/api/user",
// }

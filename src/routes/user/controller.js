const cont = require("./../controller");
const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");
const axios = require("axios");
module.exports = new (class extends cont {
  async user(req, res) {
    res.status(200).render("dashboard");
  }
  async me(req, res) {
    res.render("me");
  }
  async edit(req, res, next) {
    try {
      const user = await this.User.findOne({ username: req.params.username });
      if (!user) {
        res.status(401);
        return this.Error("کاربر مورد نظر یافت نشد‌", 401);
      }
      res.status(200).render("update");
    } catch (err) {
      next(err);
    }
  }
  async pay(req, res) {
    req.flash("msg", "! متاسفانه در حال حاضر پرداخت الکترونیکی مقدور نمیباشد");
    res.redirect("back");
  }
  async logout(req, res, next) {
    req.logOut((err) => {
      if (err) return next(err);
    });
    res.redirect("/api/auth/login");
  }
  async remove(req, res) {
    const users = await this.User.find({ username: req.params.username });
    if (!users) {
      res.status(403);
      return new this.Error("خطایی پیش آمد!", 403);
    }
    req.logOut((err) => {
      if (err) return next(err);
    });
    users.at(0).deleteOne({});
    res.status(201).redirect("/");
  }
  async update(req, res) {
    const user = await this.User.findOne({ username: req.params.username });
    let username_ex = user.username;
    let email_ex = user.email;
    user.set({ email: req.body.email, username: req.body.username });
    const result = await user.save();
    if (result.username == username_ex && result.email == email_ex) {
      return res.status(204).redirect("/api/user/me");
    } else {
      req.flash("msg", "کاربر با موفقیت بروزرسانی شد");
      res.status(201).redirect("/api/user/me");
    }
  }
  async upload(req, res) {
    let data = {
      img: req.file.path.replace(/\\/g, "/").substring(6),
    };
    await this.User.updateOne({ _id: req.user.id }, { $set: data });
    if (req.user.admin) return res.redirect("/api/admin");
    res.status(201).redirect("/api/user/me");
  }
})();

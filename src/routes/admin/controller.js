const fother = require("./../controller");
const _ = require("lodash");
const config = require("config");
const bcrypt = require("bcrypt");
const {
  findById,
  findByIdAndRemove,
  findByIdAndUpdate,
} = require("../../models/users");
module.exports = new (class extends fother {
  async Admin(req, res) {
    res.render("Admin");
  }
  async profile(req, res) {
    res.render("admin_profile");
  }
  async Manage(req, res) {
    const users = await this.User.find({});
    res.render("users", { users });
  }
  async logout(req, res) {
    req.logOut((err) => {
      if (err) return this.Error("خطا در پردازش فرمان", 500);
    });
    res.redirect("/api/auth/login");
  }
  async die(req, res) {
    await this.User.findByIdAndRemove(req.params.id);
    req.logOut((err) => {
      if (err) return this.Error("خطا در پردازش فرمان!", 500);
    });
    res.redirect("/");
  }
  async edit_admin(req, res) {
    await this.User.findByIdAndUpdate(req.params.id, {
      $set: { email: req.body.email, username: req.body.username },
    });
    req.flash("msg", "کاربر با موفقیت بروز رسانی شد");
    res.redirect("/api/admin");
  }
  async edit(req, res) {
    const user = await this.User.findById(req.params.id);
    res.render("update", { user });
  }
  async upload(req, res) {
    console.log(req.file.path);
    let path = req.file.path.replace(/\\/g, "/").substr(6);
    await this.User.findByIdAndUpdate(req.user.id, {
      $set: { img: path },
    });
    res.redirect("/api/admin");
  }
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return req.flash("err", "این ایمیل قبلا ثبت شده است");
    }

    const salt = await bcrypt.genSalt(8);
    if (!new Boolean(req.body.admin)) {
      req.body.admin = false;
    }
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let newUser = new this.User(
      _.pick(req.body, ["email", "username", "password", "admin"])
    );

    await newUser.save();
    req.flash("msg", "کاربر با موفقیت ایجاد شد!");
    res.redirect("back");
  }
  async remove(req, res) {
    const result = await this.User.findByIdAndRemove(req.params.id);
    req.flash("err", "کاربر با موفقیت حذف شد ");
    res.redirect(".");
  }
  async update(req, res) {
    await this.User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    });
    req.flash("msg", "کاربر با موفقیت بروزرسانی شد!");
    res.redirect(".");
  }
})();

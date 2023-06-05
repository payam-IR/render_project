const passport = require("passport");
const local_strategy = require("passport-local").Strategy;
const User = require("../src/models/users");
const bcrypt = require("bcrypt");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  if (user) done(null, user);
});

passport.use(
  "register-str",
  new local_strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let user = await User.findOne({ email: email });
      if (user) {
        return done(
          null,
          false,
          req.flash("err", "این ایمیل قبلا ثبت شده است")
        );
      }
      try {
        const salt = await bcrypt.genSalt(8);
        if (!(true == new Boolean(req.body.admin))) {
          req.body.admin = false;
        }
        req.body.password = await bcrypt.hash(req.body.password, salt);

        let newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          admin: req.body.admin,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        err.message = err.message || "server is not responding!";
        err.status = 403;
        done(err, false);
      }
    }
  )
);
passport.use(
  "log-str",
  new local_strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: req.body.email });
      try {
        if (!user) {
          return done(
            null,
            false,
            req.flash("err", "رمز یا ایمیل وارد شده درست نمیباشد")
          );
        }
        let result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
          return done(
            null,
            false,
            req.flash("err", "رمز یا ایمیل وارد شده درست نمیباشد")
          );
        }
        done(null, user);
      } catch (err) {
        err.status = 85;
        done(err, false);
      }
    }
  )
);

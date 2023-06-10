const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("./../models/users");
function logged(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      throw new Error("access denied!");
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
}
function de_logged(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash("msg", "شما در اکانت خود هستید!!");
  if (req.user.admin) return res.redirect("/api/admin");
  return res.redirect("/api/user");
}
async function isAdmin(req, res, next) {
  if (!req.user.admin) {
    let error = new Error("access denied!!");
    error.status = 403;
    throw error;
  }
  next();
}
async function isNotUser(req, res, next) {
  if (req.user.admin) {
    req.flash("err", "this is not your section");
    return res.redirect("/api/admin");
  }
  next();
}

module.exports = { logged, isAdmin, de_logged, isNotUser };

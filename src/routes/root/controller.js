const User = require("../../models/users");
const flash = require("connect-flash");
const fother = require("../controller");
module.exports = new (class extends fother {
  async render(req, res) {
    res.render("index");
  }
})();

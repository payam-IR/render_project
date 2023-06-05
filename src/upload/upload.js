const mkdir = require("mkdirp");
const multer = require("multer");
const storege = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storege });
module.exports = upload;

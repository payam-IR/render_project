const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
const paytool = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  resNumber: { type: String, required: true },
  charge: { type: Number, reuqired: true },
  payResult: { type: Boolean, defult: false },
});
paytool.plugin(timeStamp);
const payment = mongoose.model("payment", paytool);
module.exports = payment;

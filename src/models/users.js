const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
userSchema = new mongoose.Schema({
  email: { type: String, required: true, uniqe: true },
  img: { type: String },
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  charge: { type: Number, default: 0 },
  admin: { type: Boolean, default: false },
});
userSchema.plugin(timeStamp);
const User = mongoose.model("User", userSchema);
module.exports = User;


const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  target: Number,
  type: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  occupation: String,
  location: String,
  connections: [connectionSchema]
});
module.exports = mongoose.model("User", userSchema, "users");

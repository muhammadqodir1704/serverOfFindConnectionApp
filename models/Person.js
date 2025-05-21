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
}, { _id: false });

const peopleSchema = new mongoose.Schema({
  users: [userSchema]
});

module.exports = mongoose.model("Person", peopleSchema);

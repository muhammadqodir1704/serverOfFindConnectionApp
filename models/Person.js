const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  target: { type: Number, required: true },
  type: { type: String, required: true },
});

const personSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    location: { type: String, required: true },
    connections: [connectionSchema]
})

const Person = mongoose.model("Person", personSchema);

module.exports = Person;

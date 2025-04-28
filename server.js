
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Person = require("./models/Person");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://proffdev_66:gopa0417@cluster0.frak9kw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log("MongoDBga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("MongoDBga ulanishda xatolik:", err));

app.get("/", (req, res) => {
  res.send("Salom, bu backend server!");
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda`);
});

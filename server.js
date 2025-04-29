const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/Person"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://proffdev_66:gopa0417@cluster0.frak9kw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log("MongoDBga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("MongoDBga ulanishda xatolik:", err));
  
  app.get("/", (req, res) => {
    res.send("Server ishlayapti");
  });
  

app.get("/api/people", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: "Ma'lumotlarni olishda xatolik", error });
  }
});


app.post("/api/people", async (req, res) => {
  const personData = req.body;

  try {
    const newPerson = new Person(personData);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ message: "Ma'lumotlarni saqlashda xatolik", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda`);
});

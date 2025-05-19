const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/Person");

const app = express();
const PORT = process.env.PORT || 10000;

// Render frontenddan kirishga ruxsat berish
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://findconnectionapp.onrender.com" // Frontend URL — render frontend manzilingizni yozing
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// MongoDBga ulanish
mongoose.connect('mongodb+srv://proffdev_66:gopa0417@cluster0.frak9kw.mongodb.net/findconnection?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("✅ MongoDBga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("❌ MongoDBga ulanishda xatolik:", err));

// Asosiy route
app.get("/", (req, res) => {
  res.send("✅ Server ishlayapti");
});

// Barcha odamlarni olish
app.get("/api/people", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    console.error("❌ Error fetching people:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Yangi odam qo'shish
app.post("/api/people", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    console.error("❌ Ma'lumotlarni saqlashda xatolik:", error);
    res.status(500).json({ message: "Saqlashda xatolik", error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
});

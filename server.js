const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://find-connections-app.vercel.app",
      "https://findconnectionapp.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://proffdev_66:gopa0417@cluster0.frak9kw.mongodb.net/find_connection_app?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("✅ MongoDBga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("❌ MongoDBga ulanishda xatolik:", err));

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Ma'lumotlarni saqlashda xatolik:", error);
    res.status(500).json({ message: "Saqlashda xatolik", error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
});

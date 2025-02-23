// server.js (Node.js + Express)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User schema and model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", UserSchema);

// API to fetch user details by name
app.get("/user", async (req, res) => {
  const { name } = req.query;
  try {
    const user = await User.findOne({ name });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

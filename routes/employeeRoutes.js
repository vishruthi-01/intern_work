const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  phone: String,
  currentAddress: String,
  permanentAddress: String,
  experiences: [
    {
      company: String,
      fromDate: String,
      toDate: String,
      position: String,
    },
  ],
  qualifications: [
    {
      institution: String,
      degree: String,
      field: String,
      year: String,
    },
  ],
});

// Create Employee Model
const Employee = mongoose.model("Employee", employeeSchema);

// Add Employee Route
router.post("/add", async (req, res) => {
  try {
    const employeeData = req.body;

    // Save to MongoDB
    const newEmployee = new Employee(employeeData);
    await newEmployee.save();

    res.status(201).send({ message: "Employee added successfully!" });
  } catch (error) {
    console.error("Error while saving employee:", error);
    res.status(500).send({ message: "Error while saving employee details." });
  }
});

module.exports = router;


const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Create Employee
router.post("/add", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
